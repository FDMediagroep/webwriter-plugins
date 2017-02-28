import StocktickerPackage from './StocktickerPackage';
import {registerPlugin} from 'writer';

export default () => {
  if (registerPlugin) {
    registerPlugin(StocktickerPackage);
  } else {
    console.error("Register method not yet available");
  }
}
