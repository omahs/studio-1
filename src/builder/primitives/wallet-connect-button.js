const Plugin = (editor) => {
  const id = "wallet-connect-button";

  const block = {
    id: `section-${id}`,
    label: "Connect Wallet",
    category: "Web3 gg222",
    attributes: {
      class: "fa fa-address-card-o",
    },
    content: `
                <section id="${id}">
                  <button id="btn-login" type="button" class="btn">Connect wallet</button>
                  <button id="btn-logout" type="button" class="btn" style="display:none;">Disconnect</button>
                </section>
                <style>
              .coin-price-component img {
                display: inline-block;
              }
              </style>`,
  };

  const script = function () {
    alert("Hi");
    console.log("the element", this);
  };

  const properties = {
    isComponent: (el) => el.id === "wallet-connect-button",
    model: {
      defaults: {
        script,
      },
    },
  };

  editor.BlockManager.add(id, block);
  editor.DomComponents.addType(id, properties);
};

export default Plugin;
