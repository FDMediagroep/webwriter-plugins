import WorkinstructionsPackage from './WorkinstructionsPackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(WorkinstructionsPackage)
  } else {
    console.error("Register method not yet available");
  }
}
