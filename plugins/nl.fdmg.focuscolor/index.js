import FocusColorPackage from './FocusColorPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(FocusColorPackage);
  } else {
    console.error("Register method not yet available");
  }
}
