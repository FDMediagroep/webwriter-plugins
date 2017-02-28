import EpicPackage from './EpicPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(EpicPackage);
  } else {
    console.error("Register method not yet available");
  }
}
