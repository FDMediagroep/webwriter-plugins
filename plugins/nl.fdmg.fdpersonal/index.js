import FDPersonalPackage from './FDPersonalPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(FDPersonalPackage);
  } else {
    console.error("Register method not yet available");
  }
}
