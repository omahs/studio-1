/*eslint no-undef: "off"*/
import block from './components/block';
import properties from './components/properties';
import metadata from './metadata.json';

const Plugin = (editor) => {
    const componentId = metadata.id;
    editor.BlockManager.add(componentId, block);
    editor.DomComponents.addType(componentId, properties);
};
  
export default Plugin;
  