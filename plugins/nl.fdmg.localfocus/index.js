import LocalFocusPackage from './LocalFocusPackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(LocalFocusPackage)
  } else {
    console.error("Register method not yet available");
  }
}
