import WriterinfoPackage from './WriterinfoPackage';
import { registerPlugin } from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(WriterinfoPackage);
  } else {
    console.error("Register method not yet available: WriterinfoPackage");
  }
}