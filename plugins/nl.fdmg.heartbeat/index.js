import HeartbeatPackage from './HeartbeatPackage'
const {registerPlugin} = writer;

export default () => {
  if (registerPlugin) {
    registerPlugin(HeartbeatPackage);
  }
  else {
    console.info("Register method not yet available");
  }
}
