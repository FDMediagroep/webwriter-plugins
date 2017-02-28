import PlanneddatePackage from './PlanneddatePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(PlanneddatePackage);
  } else {
    console.error("Register method not yet available");
  }
}
