import ShortarticlePackage from './ShortarticlePackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(ShortarticlePackage)
  } else {
    console.error("Register method not yet available");
  }
}
