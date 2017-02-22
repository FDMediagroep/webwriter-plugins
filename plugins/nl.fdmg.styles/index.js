import StylesPackage from './StylesPackage'
const { registerPlugin } = writer;

export default () => {
  if (registerPlugin) {
    registerPlugin(StylesPackage)
  } else {
    console.info("Register method not yet available");
  }
}
