import NumberFramePackage from './NumberFramePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(NumberFramePackage)
  } else {
    console.error("Register method not yet available: NumberFramePackage");
  }
}