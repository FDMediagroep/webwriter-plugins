import './scss/textframe.scss'

import TextframePackage from './TextframePackage'
const { registerPlugin } = writer

export default () => {
  if (registerPlugin) {
    registerPlugin(TextframePackage)
  } else {
    console.info("Register method not yet available");
  }
}
