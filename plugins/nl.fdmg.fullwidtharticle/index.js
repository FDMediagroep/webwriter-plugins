import FullWidthArticlePackage from './FullWidthArticlePackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(FullWidthArticlePackage)
  } else {
    console.error("Register method not yet available");
  }
}
