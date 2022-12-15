/*eslint no-undef: "off"*/

const Plugin = (editor) => {
  const componentId = "action-button";

  const block = {
    id: `section-${componentId}`,
    label: `
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right-square" width="64" height="64" viewBox="0 0 24 24" stroke-width="1" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <line x1="7" y1="12" x2="21" y2="12" />
        <path d="M18 15l3 -3l-3 -3" />
        <path d="M3 10h4v4h-4z" />
      </svg>
    `,
    category: "Triggers",
    content: `
      <button type="button" class="btn btn-primary" id="${componentId}">
        <span>Action</spa>
      </button>
    `,
  };

  const script = function (props) {
    const componentId = "action-button";
    console.log(`Running script ${componentId}`);
    let payload;
    const evalCondition = (evt, data) => {

      const nft = evt.detail;
      const meta = JSON.parse(nft.metadata);
      payload = {
        username: "Dappify Webhook",
        avatar_url: "https://i.ibb.co/ZHC5n6b/S3-SNU-jpg-2.png",
        content: `You have just received a new nudge from a user!`,
        embeds: [
          {
            author: {
              name: nft.owner_of,
              url: "https://i.ibb.co/gtqZpcR/dappifylogo512-copy.png",
              icon_url: "https://i.ibb.co/gtqZpcR/dappifylogo512-copy.png",
            },
            title: `${nft.symbol} #${nft.token_id}`,
            url: `https://i.ibb.co/gtqZpcR/dappifylogo512-copy.png`,
            description: meta.description,
            color: 15258703,
            fields: [
              {
                name: "Owner",
                value: nft.owner_of,
                inline: true,
              },
              {
                name: "Token Address",
                value: nft.token_address,
                inline: true,
              },
              {
                name: "Token Id",
                value: nft.token_id,
                inline: true,
              },
            ],
            image: {
              url: meta.image,
            },
            footer: {
              text: "Powered by Dappify",
              icon_url: "https://i.ibb.co/gtqZpcR/dappifylogo512-copy.png",
            },
          },
        ],
      };
      //
    };

    document.addEventListener("onNFTSelect", evalCondition);

    $(`#${componentId}`).click((el) => {
      console.log("Triggering event call");
      const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(props.value, options)
        .then((response) => response.json())
        .then((response) => {
          // Do something with response.
        });
    });

    evalCondition();
  };

  const properties = {
    isComponent: (el) => el.id === componentId,
    model: {
      defaults: {
        script,
        value: "",
        integration: "Discord",
        traits: [
          {
            changeProp: 1,
            type: "select",
            name: "integration",
            options: [{ id: "discord", name: "Discord" }],
          },
          {
            changeProp: 2,
            type: "Text",
            name: "value",
          },
        ],
        "script-props": ["integration", "value"],
      },
    },
  };

  editor.BlockManager.add(componentId, block);
  editor.DomComponents.addType(componentId, properties);
};

export default Plugin;
