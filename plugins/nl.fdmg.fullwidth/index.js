import FullWidthPackage from './FullWidthPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(FullWidthPackage);
  } else {
    console.error("Register method not yet available");
  }
}
