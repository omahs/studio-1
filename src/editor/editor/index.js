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
import isEmpty from "lodash/isEmpty";
import { useDispatch } from "react-redux";
import { LOADER } from "store/actions";
import axios from 'axios';

const Editor = ({ projectId, onClickHome, principal }) => {
    const [editor, setEditor] = useState({});
    const dispatch = useDispatch();

    const loadProject = async () => {

      try {
        dispatch({ type: LOADER, show: true });
        const response = await axios.get(`${process.env.REACT_APP_DAPPIFY_API_URL}/project/${projectId}`,
          {
            headers: {
              "AuthorizeToken": `Bearer ${principal}`,
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }
        )
    
        const foundProject = response?.data;
        window.dappify = {
          project: foundProject,
        };

        loadEditor();
      } finally {
        dispatch({ type: LOADER, show: false });
      }
  };

  const projectEndpoint = `${process.env.REACT_APP_DAPPIFY_API_URL}/project/${projectId}/content`;

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
            headers: {
              AuthorizeToken: `Bearer ${principal}`
            },
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
        PluginEditorPanelButtons,
        PrimitiveWalletConnect,
        PluginTokenGate,
        PluginNFT,
        PluginActionButton,
        PluginTailwind,
        PageManager
      ],
      pluginsOpts: {},
      canvas: {
        scripts: [
          "https://cdn.jsdelivr.net/npm/dappify-sdk@0.0.2/dist/main.min.js",
          "https://cdn.tailwindcss.com",
          "https://code.jquery.com/jquery-3.6.1.min.js",
          "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js"
          // "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js",
          // "https://cdn.ethers.io/lib/ethers-5.0.umd.min.js",
          // "https://unpkg.com/web3modal@1.9.0/dist/index.js",
          // "https://unpkg.com/evm-chains@0.2.0/dist/umd/index.min.js",
          // "https://unpkg.com/@walletconnect/web3-provider@1.3.1/dist/umd/index.min.js",
          // "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js",
          // "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js",
        ],
        // The same would be for external styles
        styles: [
          // "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
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

  return <div id="gjs" />;
};

export default Editor;
