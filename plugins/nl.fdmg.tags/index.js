import TagsPackage from './TagsPackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(TagsPackage)
  } else {
    console.error("Register method not yet available");
  }
}
