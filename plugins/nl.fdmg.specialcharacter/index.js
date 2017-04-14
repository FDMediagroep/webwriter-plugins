import SpecialCharacterPackage from './SpecialCharacterPackage'
const {registerPlugin} = writer;

export default () => {
  if (registerPlugin) {
    registerPlugin(SpecialCharacterPackage);
  }
  else {
    console.info("Register method not yet available");
  }
}
