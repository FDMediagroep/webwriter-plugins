import PreambleStandinPackage from './PreambleStandinPackage';
import { registerPlugin } from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(PreambleStandinPackage);
  } else {
    console.error("Register method not yet available");
  }
}