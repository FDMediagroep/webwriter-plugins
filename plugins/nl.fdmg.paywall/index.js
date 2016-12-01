import PaywallPackage from './PaywallPackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(PaywallPackage)
  } else {
    console.error("Register method not yet available");
  }
}
