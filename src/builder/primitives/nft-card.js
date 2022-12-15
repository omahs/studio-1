/*eslint no-undef: "off"*/

const Plugin = (editor) => {
  const componentId = "nft-card";

  const block = {
    id: `section-${componentId}`,
    label: `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo" width="64" height="64" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <line x1="15" y1="8" x2="15.01" y2="8" />
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M4 15l4 -4a3 5 0 0 1 3 0l5 5" />
        <path d="M14 14l1 -1a3 5 0 0 1 3 0l2 2" />
      </svg>
    `,
    category: "NFT",
    content: `
      <div class="container" id="${componentId}">
        <div class="row">
          <div class="col">
            <div class="card nft-card" id="nft-container-1">
              <img id="nft-image-1" src="https://lstr.by/wp-content/uploads/woocommerce-placeholder-400x400.png" />
              <div id="nft-title-1">Title</div>
              <div id="nft-description-1">Description</div>
            </div>
          </div>
        </div>
      </div>
      <style>
        .nft-card {
          padding: 20px;
          height: auto;
          background: black;
        }
        .nft-card img {
          margin: 0 auto;
        }
      </style>`,
  };

  const script = function (props) {
    const componentId = "nft-card";
    console.log(`Running script ${componentId}`);
    if (!props.contract) return;

    const evalCondition = () => {
      const account = getAccount();

      $(".nft-card").click((el) => {
        const nft = el.target.getAttribute("data-metadata");
        document.dispatchEvent(new CustomEvent("onNFTSelect", { detail: JSON.parse(nft) }));
        console.log(`Event dispatched with content ${nft}`);
      });

      fetch(
        `https://deep-index.moralis.io/api/v2/${account}/nft?chain=eth&format=decimal&limit=1&token_addresses=${props.contract}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "X-API-Key": process.env.REACT_APP_MORALIS_API_KEY,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((result) => result.json())
      .then((data) => {
        const list = data.result;

        $(".nft-card").css("display", "block");
  
        list.forEach((item, index) => {
          const meta = JSON.parse(item.metadata);
          $(`#nft-container-${index + 1}`).attr(
            "data-metadata",
            JSON.stringify(item)
          );
          $(`#nft-image-${index + 1}`).attr("src", meta.image);
          $(`#nft-title-${index + 1}`).text(`${item.symbol} #${item.token_id}`);
          $(`#nft-description-${index + 1}`).text(item.name);
        });
      });
    };

    const getAccount = () => {
      const provider = window.walletProvider;
      if (!provider) return;

      if (provider.accounts && provider.accounts.length > 0)
        return provider.accounts[0];

      return provider.selectedAddress;
    };

    const hide = () => {
      $(".nft-card").css("display", "none");
    };

    document.addEventListener("Connected", () => evalCondition());
    document.addEventListener("accountsChanged", () => evalCondition());
    document.addEventListener("chainChanged", () => evalCondition());
    document.addEventListener("networkChanged", () => evalCondition());
    document.addEventListener("onDisconnect", () => hide());

    evalCondition();
  };

  const properties = {
    isComponent: (el) => el.id === componentId,
    model: {
      defaults: {
        script,
        contract: "",
        traits: [
          {
            changeProp: 1,
            type: "text",
            name: "contract",
          },
        ],
        "script-props": ["contract"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
