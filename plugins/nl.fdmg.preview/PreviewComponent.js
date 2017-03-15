import { Component, FontAwesomeIcon } from 'substance';
import { api } from 'writer';

const pluginId = 'nl.fdmg.preview';

export default class PreviewComponent extends Component {

  getInitialState() {
    return {
      disabledClass: this.isNewArticle()
    };
  }

  isNewArticle() {
    let id = api.newsItem.getIdForArticle();

    if (id.indexOf('-') > -1) {
      id = id.substring(id.indexOf('-') + 1);
    }
    // When id can't be parsed to integer value it means it is a new article. In that case we disable the previewbutton.
    if (isNaN(id)) {
      return 'disabled-preview-button';
    }
  }

  getDisabled() {
    if (this.state.disabledClass === 'disabled-preview-button') {
      api.ui.showNotification('nl.fdmg.preview', api.getLabel('no-preview-notification-heading'), api.getLabel('no-preview-notification-text'))
    } else {
      return;
    }
  }

  render($$) {

    const previewButton = $$('div')
      .addClass('fdmg-sidebar preview')
      .append(
        $$('a')
        .attr({
          'href': this.getPreviewUrl(),
          'target': '_blank'
        }).addClass('btn preview-button btn-secondary ' + this.state.disabledClass)
        .on('click', () => {
          this.getDisabled()
        })
        .append(
          this.getLabel('Preview'),
          ' ',
          $$(FontAwesomeIcon, { icon: 'fa-eye' })
        )
      )

    return previewButton;
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

    if (isNaN(id)) {
      return;
    } else {
      return previewBaseUrl.replace('${id}', id);
    }

  }
}