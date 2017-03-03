import TextcountSelectorPackage from './TextcountSelectorPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(TextcountSelectorPackage);
  } else {
    console.error("Register method not yet available");
  }
}
