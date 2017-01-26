import StackFramePackage from './StackFramePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(StackFramePackage);
  } else {
    console.error("Register method not yet available: StackFramePackage");
  }
}