import XimTeaserStandinPackage from './XimTeaserStandinPackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(XimTeaserStandinPackage)
  } else {
    console.error("Register method not yet available");
  }
}
