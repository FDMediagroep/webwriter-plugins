import WorkflowstatePackage from './WorkflowstatePackage'
import {registerPlugin} from 'writer'

export default () => {
  if (registerPlugin) {
    registerPlugin(WorkflowstatePackage)
  } else {
    console.error("Register method not yet available");
  }
}
