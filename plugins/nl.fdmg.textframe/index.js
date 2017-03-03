import './scss/textframe.scss';
import TextframePackage from './TextframePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(TextframePackage);
  } else {
    console.info("Register method not yet available");
  }
}
