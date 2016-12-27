import TranslationsPackage from './TranslationsPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(TranslationsPackage);
  } else {
    console.error("Register method not yet available");
  }
}
