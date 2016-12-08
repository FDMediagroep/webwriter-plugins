import QuotePackage from './QuotePackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(QuotePackage)
  } else {
    console.error("Register method not yet available: QuotePackage");
  }
}