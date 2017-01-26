import SidebartabsPackage from './SidebartabsPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(SidebartabsPackage);
  } else {
    console.error("Register method not yet available: SidebartabsPackage");
  }
}
