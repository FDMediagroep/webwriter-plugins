import TextFramePackage from './TextFramePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(TextFramePackage);
  } else {
    console.error("Register method not yet available: TextFramePackage");
  }
}