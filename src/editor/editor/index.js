/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import grapesjs from "grapesjs";

import PrimitiveWalletConnect from "../primitives/wallet-connect-button";
import PluginTokenGate from "../primitives/token-gated-container";
import PluginNFT from "../primitives/nft-card";
import PluginActionButton from "../primitives/action-button";
import PluginTailwind from "grapesjs-tailwind";

import PageManager from "./Plugins/PageManager";

import PluginEditorPanelButtons from "./Panel/Buttons";
import ConfirmationModal from "../views/modal/Confirmation";
import { useMoralis } from "react-moralis";
import isEmpty from "lodash/isEmpty";

import axios from 'axios';

const Editor = ({ projectId, onClickHome }) => {
  const [editor, setEditor] = useState({});
  const [project, setProject] = useState({});
  const { Moralis, user } = useMoralis();

  const getUrl = (subdomain) => {
    const environmentPrefix =
      process.env.REACT_APP_HOST_ENV === "production"
        ? ""
        : `${process.env.REACT_APP_HOST_ENV}.`;
    const subdomainPrefix = subdomain ? `${subdomain}.` : "";
    return `https://${subdomainPrefix}${environmentPrefix}dappify.com`;
  };

  const loadFns = () => {
    window.handlePublishToIpfs = async (event) => {
      event.preventDefault();
      event.target.parentNode.querySelector("#publish-btn").style.display =
        "none";
      event.target.parentNode.querySelector("#wait-publish-btn").style.display =
        "block";

        
        const pageManager = editor.Pages;
        const currentPageId = pageManager.getSelected().id;

        const allPages = [];
        pageManager.getAll().forEach(async (page) => {

          pageManager.select(page.id);
          const pageName = page.attributes?.type === 'main' ? 'index' : page.attributes?.name;
          const body = page.getMainComponent().toHTML();

          const functionalBody = body.replace(
            '</body', 
            `<script>
                ${editor.getJs()}
              </script>
            </body>`
          );

          const content = `
            <!doctype html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
                <script src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"></script>
                <script src="https://unpkg.com/web3modal@1.9.0/dist/index.js"></script>
                <script src="https://unpkg.com/evm-chains@0.2.0/dist/umd/index.min.js"></script>
                <script src="https://unpkg.com/@walletconnect/web3-provider@1.3.1/dist/umd/index.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js"></script>
                <style>
                  ${editor.getCss()}
                </style>
              </head>
              ${functionalBody}
            </html>`;

            allPages.push({
              path: `${pageName}.html`,
              content:btoa(content)
            });
        });

        // Return to original selected page
        pageManager.select(currentPageId);

        const upload = await axios.post('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
            allPages,
            {
              headers: {
                "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
                "Content-Tyoe": "application/json",
                "accept": "application/json"
              }
            }
        )

        const indexPage = upload?.data?.find((item) => item.path.includes('/index.html'));
        const cid = indexPage.path.split('/')[4];
        const url = `https://ipfs.moralis.io:2053/ipfs/${cid}/index.html`;

        // Register in AWS deploy
        const defaultSubdomain = process.env.REACT_APP_HOST_ENV === 'dev' ?
           `${project.get("subdomain")}.dev.dappify.com` :
           `${project.get("subdomain")}.dappify.com`;

        await publishRouting(defaultSubdomain, cid);

        // Custom domain?
        const defaultDomain = project.get("domain");
        if (defaultDomain) {
          await publishRouting(defaultDomain, cid);
        }

        // Save as project in Moralis (Legacy)
        project.set("url", url);
        project.set("hash", cid);
        await project.save();

        const uri = getUrl(project.get("subdomain"));
            console.log(uri);
            console.log(cid);
            console.log(url);
        // Show confirmation modal
        const modal = editor.Modal;
        modal.open({
          title: "Congratulations",
          content: ConfirmationModal({ url, cid, uri }),
          attributes: { class: "my-class" },
        });
      };
    };

    const loadProject = async () => {
      const Proj = Moralis.Object.extend("Project");
      const query = new Moralis.Query(Proj);
      query.equalTo("owner", user);
      query.equalTo("objectId", projectId);
      const foundProject = await query.first();
      setProject(foundProject);

      // Set context
      window.dappify = {
        project: foundProject,
      };

      loadEditor();
  };

  const publishRouting = async (id, cid) => {
    return await axios.post(`${process.env.REACT_APP_DAPPIFY_API_URL}/route/${id}`,
      {
        id: id,
        cid: cid
      },
      {
        headers: {
          "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
          "Content-Tyoe": "application/json",
          "accept": "application/json"
        }
      }
    )
  }

  const projectEndpoint = `${process.env.REACT_APP_DAPPIFY_API_URL}/project/${projectId}`;

  const loadEditor = () => {
    if (!isEmpty(editor)) return;

    // Handle tailwind's use of slashes in css names
    const escapeName = (name) =>
      `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-");

    const editorUI = grapesjs.init({
      container: "#gjs",
      height: "100vh",
      width: "100%",
      fromElement: true,
      selectorManager: { escapeName },
      pageManager: true, // This should be set to true
      // storageManager: false,
      storageManager:  {
        type: 'remote',
        autosave: true, // Store data automatically
        autoload: true, // Autoload stored data on init
        stepsBeforeSave: 1, 
        options: {
          remote: {
            urlLoad: projectEndpoint,
            urlStore: projectEndpoint,
            // The `remote` storage uses the POST method when stores data but
            // the json-server API requires PATCH.
            // fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
            // As the API stores projects in this format `{id: 1, data: projectData }`,
            // we have to properly update the body before the store and extract the
            // project data from the response result.
            onStore: data => ({ id: projectId, data }),
            onLoad: result => result.data,
          }
        }
      },
      plugins: [
        // PluginProjectManager,
        // PluginTailwind,
        PluginEditorPanelButtons,
        PrimitiveWalletConnect,
        // PluginSmartContract,
        PluginTokenGate,
        PluginNFT,
        PluginActionButton,
        PluginTailwind,
        PageManager
      ],
      pluginsOpts: {},
      canvas: {
        scripts: [
          "https://cdn.tailwindcss.com",
          "https://code.jquery.com/jquery-3.6.1.min.js",
          "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js",
          "https://cdn.ethers.io/lib/ethers-5.0.umd.min.js",
          "https://unpkg.com/web3modal@1.9.0/dist/index.js",
          "https://unpkg.com/evm-chains@0.2.0/dist/umd/index.min.js",
          "https://unpkg.com/@walletconnect/web3-provider@1.3.1/dist/umd/index.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js",
          "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js",
        ],
        // The same would be for external styles
        styles: [
          "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        ],
      },
    });

    // editorUI.setComponents(LandingPage.html);
    // editorUI.setStyle(LandingPage.style);
    const panels = editorUI.Panels;
    panels.addButton("options", [
      {
        id: "home",
        command: onClickHome,
        label: `
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#c6c7c8" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <polyline points="5 12 3 12 12 3 21 12 19 12" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <rect x="10" y="12" width="4" height="4" />
                    </svg>
                `,
        attributes: {
          title: "Home Profile",
        },
      },
    ]);

    setEditor(editorUI);
  };

  useEffect(() => {
    loadProject();
  }, []);

  useEffect(() => {
    if (editor) loadFns();
  }, [editor]);

  return <div id="gjs" />;
};

export default Editor;
