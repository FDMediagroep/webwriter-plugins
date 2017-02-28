import DoNotIndexPackage from './DoNotIndexPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(DoNotIndexPackage);
  } else {
    console.error("Register method not yet available");
  }
}
