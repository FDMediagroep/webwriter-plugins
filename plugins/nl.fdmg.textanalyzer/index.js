import TextAnalyzerPackage from './TextAnalyzerPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(TextAnalyzerPackage);
  } else {
    console.error("Register method not yet available");
  }
}
