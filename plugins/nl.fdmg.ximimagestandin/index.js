import XimImageStandinPackage from './XimImageStandinPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(XimImageStandinPackage);
  } else {
    console.error("Register method not yet available");
  }
}
