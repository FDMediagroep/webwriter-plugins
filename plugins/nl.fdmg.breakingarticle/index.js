import BreakingarticlePackage from './BreakingarticlePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(BreakingarticlePackage);
  } else {
    console.error("Register method not yet available");
  }
}
