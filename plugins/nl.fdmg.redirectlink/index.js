import RedirectLinkPackage from './RedirectLinkPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(RedirectLinkPackage);
  } else {
    console.error("Register method not yet available");
  }
}
