import HeadlineStandinPackage from './HeadlineStandinPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(HeadlineStandinPackage);
  } else {
    console.error("Register method not yet available");
  }
}
