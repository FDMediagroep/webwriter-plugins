import RelatedArticlesPackage from './RelatedArticlesPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(RelatedArticlesPackage);
  } else {
    console.error("Register method not yet available");
  }
}
