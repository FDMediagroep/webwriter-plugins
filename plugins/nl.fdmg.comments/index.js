import CommentsPackage from './CommentsPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(CommentsPackage);
  } else {
    console.error("Register method not yet available");
  }
}
