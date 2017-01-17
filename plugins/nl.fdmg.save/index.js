import SavePackage from './SavePackage'
const {registerPlugin} = writer

export default () => {
  if (registerPlugin) {
    registerPlugin(SavePackage)
  }
  else {
    console.info("Register method not yet available");
  }
}
