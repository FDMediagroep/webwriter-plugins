import PlanneddateselectorPackage from './PlanneddateselectorPackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(PlanneddateselectorPackage)
  } else {
    console.error("Register method not yet available");
  }
}
