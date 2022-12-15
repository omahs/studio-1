/*eslint no-undef: "off"*/

const Plugin = (editor) => {
  const componentId = "token-gated-container";

  const block = {
    id: `section-${componentId}`,
    label: `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="64" height="64" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="16" r="1" />
        <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
      </svg>
    `,
    category: "Token Gates",
    content: `
      <div id=${componentId}>
        <span>This is a token gated container. Add content inside and then remove this text.</span>
      </div>
      <style>
          #${componentId} {
            min-width: 100px;
            min-height: 50px;
          }
      </style>
    `,
  };

  const script = function (props) {
    const componentId = "token-gated-container";
    console.log(`Running script ${componentId}`);
    if (!props.contract) return;

    const abi = [
      {
        constant: true,
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];

    const getAccount = () => {
      const provider = window.walletProvider;
      if (!provider) return;

      if (provider.accounts && provider.accounts.length > 0)
        return provider.accounts[0];
      
      return provider.selectedAddress;
    };


    const evalCondition = () => {
      if (!window.walletProvider) return false;
      let numericBalance = 0;

      // Retrieve account
      try {
        hide();
        const provider = new ethers.providers.Web3Provider(window.walletProvider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(props.contract, abi, signer);
        const account = getAccount();
        contract.balanceOf(account).then((balance) => {
          numericBalance = balance.toNumber();
          if (numericBalance > 0) {
            show();
          }
        });
        
      } catch (e) {
        console.log(e);
      }
    };

    const hide = () => {
      if (!props.isEdit)
        $(`#${componentId}`).css("display", "none");
    };

    const show = () => {
      if (!props.isEdit)
        $(`#${componentId}`).css("display", "block");
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
        isEdit: false,
        traits: [
          {
            changeProp: 1,
            type: "text",
            name: "contract",
          },
          {
            type: "checkbox",
            label: "Edit Mode",
            name: "isEdit",
            changeProp: 2,
          },
        ],
        "script-props": ["contract", "isEdit"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
