import HtmlEmbedPackage from './HtmlEmbedPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(HtmlEmbedPackage);
  } else {
    console.error("Register method not yet available");
  }
}
