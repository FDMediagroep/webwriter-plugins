import ImageSearchPackage from './ImageSearchPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(ImageSearchPackage);
  } else {
    console.error("Register method not yet available");
  }
}
