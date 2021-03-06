import ServicePagePackage from './ServicePagePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(ServicePagePackage);
  } else {
    console.error("Register method not yet available");
  }
}
