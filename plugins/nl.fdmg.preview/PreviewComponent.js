import { Component, FontAwesomeIcon } from 'substance';
import { api } from 'writer';

const pluginId = 'nl.fdmg.preview';

export default class PreviewComponent extends Component {

  render($$) {
    return $$('div')
      .addClass('fdmg-sidebar preview')
      .append(
        $$('a')
        .attr({
          'href': this.getPreviewUrl(),
          'target': '_blank'
        }).addClass('btn preview-button btn-secondary')
        .append(
          this.getLabel('Preview'),
          ' ',
          $$(FontAwesomeIcon, { icon: 'fa-external-link-square' })
        )
      )
  }

  getPreviewUrl() {
    let id;
    try {
      const articleId = this.context.api.getIdForArticle();
      if (articleId.indexOf('-') > -1) {
        id = articleId.substring(articleId.indexOf('-') + 1)
      } else {
        id = articleId
      }
    } catch (e) {
      const locationId = window.location.href.split('#').pop();
      if (locationId.indexOf('-') > -1) {
        id = locationId.substring(locationId.indexOf('-') + 1)
      } else {
        id = locationId
      }
    }

    const previewBaseUrl = api.getConfigValue(pluginId, 'previewBaseUrl');

    return previewBaseUrl.replace('${id}', id)
  }
}