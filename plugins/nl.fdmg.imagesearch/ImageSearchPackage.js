import './scss/imagesearch.scss'
import ImageSearchTool from './ImageSearchTool'
import ImageSearchCommand from './ImageSearchCommand'

export default {
  id: 'nl.fdmg.imagesearch',
  name: 'imagesearch',

  configure: function(config) {
    config.addContentMenuTopTool('image-search', ImageSearchTool)
    config.addCommand('image-search', ImageSearchCommand)
    config.addLabel('Add/search image', { nl: 'Afbeelding invoegen (Hollandse Hoogte)' });
    config.addLabel('Image search', { nl: 'Afbeelding zoeken' });
    config.addLabel('Upload image', { nl: 'Afbeelding uploaden' });
    config.addLabel('Search query', { nl: 'Zoekterm' });
    config.addLabel('Search', { nl: 'Zoeken' });
  }
}
