import RelatedLinkPackage from './RelatedLinkPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(RelatedLinkPackage);
  } else {
    console.error("Register method not yet available: RelatedLinkPackage");
  }
}