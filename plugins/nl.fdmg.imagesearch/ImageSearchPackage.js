import './scss/imagesearch.scss'
import ImageSearchTool from './ImageSearchTool'
import ImageSearchCommand from './ImageSearchCommand'

export default {
  id: 'nl.fdmg.imagesearch',
  name: 'imagesearch',

  configure: function(config) {
    config.addContentMenuTopTool('image-search', ImageSearchTool)
    config.addCommand('image-search', ImageSearchCommand)
  }
}
