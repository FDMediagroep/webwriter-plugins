import {Tool} from 'substance';
import {api} from 'writer';
import ImageSearchDialog from './ImageSearchDialog';
const pluginId = 'nl.fdmg.imagesearch';

class ImageSearchTool extends Tool {
  render($$) {
    return $$('div')
      .attr({title: this.getLabel('Search image')})
      .append(
        $$('button')
          .addClass('se-tool')
          .append($$('i').addClass('fa fa-picture-o'))
          .attr('title', this.getLabel('Add/search image'))
          .on('click', () => {
            api.ui.showDialog(
              ImageSearchDialog, {
                loadNextScrollThreshold: api.getConfigValue(pluginId, 'loadNextScrollThreshold', 100)
              }, {
                primary: false,
                center: true,
                title: this.getLabel('Image search')
              }
            )
          })
      )
  }
}

export default ImageSearchTool;
