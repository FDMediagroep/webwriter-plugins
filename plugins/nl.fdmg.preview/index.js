import PreviewPackage from './PreviewPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(PreviewPackage);
  } else {
    console.error("Register method not yet available: PreviewPackage");
  }
}
