/*eslint no-undef: "off"*/
const script = function (props) {
    const componentId = this.id;
    console.log(`Running script ${componentId}`);

    const { 
        Web3Modal, 
        WalletConnectProvider,
        UAuthWeb3Modal,
        UAuthSPA
    } = window.dappify;

    const cachedProviderName = "WEB3_CONNECT_CACHED_PROVIDER";
    const ethers = window.ethers;
    const originalText = $(`#${componentId} span`).text();
    let modal, walletProvider;

    function getInfuraId() {
        const key = process.env.REACT_APP_INFURA_KEY;
        console.log(`Using default Dappify Infura key ${key}`);
        return key;
    }
    console.log(WalletConnectProvider);
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
        }
    };

    if (props.udAppId) {
        providerOptions["custom-uauth"] = {
            display: UAuthWeb3Modal.display,
            connector: UAuthWeb3Modal.connector,
            package: UAuthSPA,
            options: {
              clientID: props.udAppId,
              scope: 'openid wallet',
              redirectUri: props.udCallback
            },
          }
    }

    function init() {


        modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
        theme: {
            background: "rgb(39, 49, 56)",
            main: "rgb(199, 199, 199)",
            secondary: "rgb(136, 136, 136)",
            border: "rgba(195, 195, 195, 0.14)",
            hover: "rgb(16, 26, 32)"
        }
        });

        if (props.udAppId)
            UAuthWeb3Modal.registerWeb3Modal(modal);

        const cachedProvider = localStorage.getItem(cachedProviderName);
        if (cachedProvider) {
        connect();
        }
    }

    function formatAddress(address) {
        return `${address.slice(0, 6)}...${address.slice(address.length-4, address.length)}`
    }

    function fetchAccountData() {
        const wallet = new ethers.providers.Web3Provider(walletProvider);
        const signer = wallet.getSigner();
        signer.getAddress().then((selectedAccount) => {
            $(`#${componentId} span`).text(formatAddress(selectedAccount));
        });
    }

    function connect() {
        console.log("Connecting wallet", modal);
        try {
        modal.connect().then((provider) => {
            console.log(provider);
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

    async function disconnect () {
        console.log("Disconnecting wallet", walletProvider);
        document.dispatchEvent(new Event("onDisconnect", walletProvider));
        if (walletProvider.close) walletProvider.close();
        await modal.clearCachedProvider();
        walletProvider = null;
        window.walletProvider = null;
        localStorage.removeItem(cachedProviderName);
        window.localStorage.clear();
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
        const btn = $(`#${componentId}`);
        btn.click(handleToggleConnect);
    }
};

export default script;