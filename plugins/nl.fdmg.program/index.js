import ProgramPackage from './ProgramPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(ProgramPackage);
  } else {
    console.error("Register method not yet available");
  }
}
