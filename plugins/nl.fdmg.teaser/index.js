import './scss/teaser.scss'

import TeaserPackage from './TeaserPackage'
const { registerPlugin } = writer

export default () => {
  if (registerPlugin) {
    registerPlugin(TeaserPackage)
  } else {
    console.info("Register method not yet available");
  }
}
