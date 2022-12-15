/*eslint no-undef: "off"*/

const Plugin = (editor) => {
  const componentId = "wallet-connect-button";

  const block = {
    id: `section-${componentId}`,
    label: `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="64" height="64" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
        <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
      </svg>
    `,
    category: "Wallet",
    content: `
      <button class="btn btn-primary" id="${componentId}">
        <span>Connect Wallet</span>
      </button>
    `,
  };

  async function script (props) {
    const componentId = "wallet-connect-button";
    console.log(`Running ${componentId}`);

    const cachedProviderName = "WEB3_CONNECT_CACHED_PROVIDER";
    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;
    const ethers = window.ethers;
    const originalText = $(`#${componentId} span`).text();
    let modal, walletProvider;
  
    function getInfuraId() {
      if (props.infuraKey) return props.infuraKey;
      console.log("Using default Dappify Infura key");
      return process.env.REACT_APP_INFURA_KEY;
    }
  
    function init() {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: getInfuraId(),
            rpc: {
              1: `https://mainnet.infura.io/v3/${getInfuraId()}`,
              42: `https://kovan.infura.io/v3/${getInfuraId()}`,
              137: `https://polygon-mainnet.infura.io/v3/${getInfuraId()}`,
              80001: "https://matic-mumbai.chainstacklabs.com",
            },
          },
        },
      };
  
      modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
      });
  
      const cachedProvider = localStorage.getItem(cachedProviderName);
      if (cachedProvider) {
        connect();
      }
    }
  
    async function fetchAccountData() {
      const wallet = new ethers.providers.Web3Provider(walletProvider);
      const signer = wallet.getSigner();
      const selectedAccount = await signer.getAddress();
      $(`#${componentId} span`).text(selectedAccount);
    }
  
    function connect() {
      console.log("Connecting wallet", modal);
      try {
        modal.connect().then((provider) => {
          walletProvider = provider;
          window.walletProvider = provider;
          document.dispatchEvent(new Event("Connected", provider));
  
          walletProvider.on("accountsChanged", (accounts) => {
            document.dispatchEvent(new Event("accountsChanged", accounts));
            fetchAccountData();
          });
  
          walletProvider.on("chainChanged", (chainId) => {
            document.dispatchEvent(new Event("chainChanged", chainId));
            fetchAccountData();
          });
  
          walletProvider.on("networkChanged", (networkId) => {
            document.dispatchEvent(new Event("networkChanged", networkId));
            fetchAccountData();
          });
  
          fetchAccountData();
        });
      } catch (e) {
        console.log("Could not get a wallet connection", e);
      }
    }
  
    function disconnect() {
      console.log("Disconnecting wallet", walletProvider);
      document.dispatchEvent(new Event("onDisconnect", walletProvider));
      if (walletProvider.close) walletProvider.close();
      modal.clearCachedProvider();
      walletProvider = null;
      window.walletProvider = null;
      $(`#${componentId} span`).text(originalText);
    }
  
    function handleToggleConnect() {
      if (window.walletProvider) {
        disconnect();
      } else {
        connect();
      }
    }
  
    init();
  
    if (!props.isEdit) {
      $(`#${componentId}`).click(handleToggleConnect);
    }
  };

  const properties = {
    isComponent: (el) => el.id === componentId,
    model: {
      defaults: {
        script,
        isEdit: false,
        traits: [
          {
            type: "text",
            label: "Infura ID",
            name: "infuraKey",
            changeProp: 1,
          },
          {
            type: "checkbox",
            label: "Edit Mode",
            name: "isEdit",
            changeProp: 2,
          },
        ],
        "script-props": ["infuraKey", "isEdit"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
