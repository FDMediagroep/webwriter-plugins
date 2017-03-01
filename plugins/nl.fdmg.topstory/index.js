import TopstoryPackage from './TopstoryPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(TopstoryPackage);
  } else {
    console.error("Register method not yet available");
  }
}
