import blockImage from '../assets/images/block.svg';
import metadata from '../metadata.json';
console.log(blockImage);

const block = {
    id: `section-${metadata.id}`,
    label: `<object type="image/svg+xml" data=${blockImage} style="width:100%; min-height:110px;" />`,
    category: "Wallet Connect",
    content: `
      <button id="${metadata.id}">
        <span id="wcb-not-authenticated">Connect Wallet</span>
      </button>
      <style>
        #${metadata.id} {
            background-color: #7572f9;
            height: 50px;
            width: 175px;
            border-radius: 6px;
        }
      </style>
    `,
  };

export default block;
