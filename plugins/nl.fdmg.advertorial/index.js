import AdvertorialPackage from './AdvertorialPackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(AdvertorialPackage)
  } else {
    console.error("Register method not yet available");
  }
}
