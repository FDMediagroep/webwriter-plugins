import RubricPackage from './RubricPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(RubricPackage);
  } else {
    console.error("Register method not yet available");
  }
}
