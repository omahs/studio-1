import script from './script';
import metadata from '../metadata.json';

const properties = {
    isComponent: (el) => el.id === metadata.id,
    model: {
      defaults: {
        script,
        isEdit: false,
        traits: [
          {
            type: "checkbox",
            label: "Edit Mode",
            name: "isEdit",
            changeProp: 1,
          },
          {
            type: "text",
            label: "UD callback url",
            name: "udCallback",
            changeProp: 2,
          },
          {
            type: "text",
            label: "UD app Id",
            name: "udAppId",
            changeProp: 3,
          },
        ],
        "script-props": ["isEdit", "udCallback", "udAppId"],
      },
    },
};

export default properties;
