import SectionPackage from './SectionPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(SectionPackage);
  } else {
    console.error("Register method not yet available");
  }
}
