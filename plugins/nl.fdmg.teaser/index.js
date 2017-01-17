import './scss/teaser.scss'

import teaserPackage from './teaserPackage'
const { registerPlugin } = writer

export default () => {
  if (registerPlugin) {
    registerPlugin(teaserPackage)
  } else {
    console.info("Register method not yet available");
  }
}
