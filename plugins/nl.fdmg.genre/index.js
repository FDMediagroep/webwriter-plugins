import GenrePackage from './GenrePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(GenrePackage);
  } else {
    console.error("Register method not yet available");
  }
}
