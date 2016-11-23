const Component = require('substance/ui/Component')
const Icon = require('substance/ui/FontAwesomeIcon')
const $$ = Component.$$

function PreviewComponent() {
  PreviewComponent.super.apply(this, arguments)
}

PreviewComponent.Prototype = function() {
  this.render = function() {
    return $$('div')
      .addClass('fdmg-sidebar preview')
      .append(
        $$('a')
          .attr({
            'href': this.getPreviewUrl(),
            'target': '_blank'
          })
          .append(
            this.context.i18n.t('Preview'),
            ' ',
            $$(Icon, {icon: 'fa-external-link-square'})
          )
      )
  }

  this.getPreviewUrl = function() {
    let id
    try {
      const articleId = this.context.api.getIdForArticle()
      if (articleId.indexOf('-') > -1) {
        id = articleId.substring(articleId.indexOf('-') + 1)
      } else {
        id = articleId
      }
    } catch (e) {
      const locationId = window.location.href.split('#').pop()
      if (locationId.indexOf('-') > -1) {
        id = locationId.substring(locationId.indexOf('-') + 1)
      } else {
        id = locationId
      }
    }

    const previewBaseUrl = this.context.api.getConfigValue('preview', 'previewBaseUrl')

    return previewBaseUrl + id
  }
}

Component.extend(PreviewComponent)
module.exports = PreviewComponent
