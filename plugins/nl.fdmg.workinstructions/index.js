import WorkInstructionsPackage from './WorkInstructionsPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(WorkInstructionsPackage);
  } else {
    console.error("Register method not yet available");
  }
}
