const Component = require('substance/ui/Component')
const $$ = Component.$$
const genUuid = require('writer/utils/IdGenerator')
const _ = require('lodash')

function TextcountMainComponent() {
  TextcountMainComponent.super.apply(this, arguments)

  this.context.api.on('textcount', 'document:changed', function() {
    this.updateCount()
  }.bind(this))
}

TextcountMainComponent.Prototype = function() {

  this.getInitialState = function() {
    const countedElements = this.context.api.getConfigValue('textcount', 'countedElements', [])
    const availableSizes = this.context.api.getConfigValue('textcount', 'sizes', [])
    const margin = this.context.api.getConfigValue('textcount', 'marginPercentage')
    const documentSize = this.getDocumentSize()
    const wordCount = 0
    const charCount = 0

    return {
      countedElements,
      availableSizes: ([{size: '?', charCount: '?', disabled: true}]).concat(availableSizes),
      margin,
      documentSize,
      wordCount,
      charCount
    }
  }

  this.didMount = function() {
    this.updateCount();
  }

  this.render = function() {
    return $$('div')
      .addClass('textcount plugin')
      .append(
        $$('hr'),
        $$('div')
          .addClass('count__info-container fdmg-sidebar')
          .append(
            $$('div')
              .addClass('count-info form-group')
              .append(
                $$('select')
                  .ref('select')
                  .append(
                    this.state.availableSizes.map((size) => {
                      const label = size.size
                      const charCount = (size.charCount == 'Inf' ? '∞' : size.charCount)
                      return $$('option')
                        .attr({
                          'data-id': label,
                          disabled: size.disabled,
                          selected: size.disabled || this.state.documentSize == label
                        })
                        .append(size.charCount != '?' ? `${label} ( ${charCount} )` : label)
                    })
                  )
                  .on('change', function(e) {
                    const size = this.refs.select.$el.find('option:selected').data('id')
                    this.updateDocumentSize(size)
                  }.bind(this)),
                $$('p').append(this.context.i18n.t('Size'))
            ),
            $$('div')
              .addClass('count-info')
              .attr({title: this.context.i18n.t('Character count')})
              .append(
                $$('span').addClass(this.getCharCountModifier()).append('' + this.state.charCount),
                $$('p').append(this.context.i18n.t('Characters'))
              ),
            $$('div')
              .addClass('count-info')
              .attr({title: this.context.i18n.t('Word count')})
              .append(
                $$('span').append('' + this.state.wordCount),
                $$('p').append(this.context.i18n.t('Words'))
              )
        )
      )
  }

  this.dispose = function() {
    this.context.api.off('textcount', 'document:changed')
  }

  this.updateCount = function() {
    const count = this.performCount()

    this.extendState({
      wordCount: count.words,
      charCount: count.chars
    })
  }

  this.getDocumentSize = function() {
    const links = this.context.api.getLinkByType('textcount', 'fdmg/textcount')

    if (links.length >= 1) {
      return links[0]['@size']
    }
    return ''
  }

  this.updateDocumentSize = function(size) {
    const api = this.context.api

    // Delete previous document size(s)
    api.getLinkByType('textcount', 'fdmg/textcount').forEach((l) => api.removeLinkByUUIDAndRel('textcount', l['@uuid'], l['@rel']))

    // Write size to document
    api.addLink('textcount', {
      '@rel': 'textcount',
      '@type': 'fdmg/textcount',
      '@size': size,
      '@uuid': genUuid()
    })

    // Update component state
    this.extendState({documentSize: size})
  }

  this.performCount = function() {
    const nodes = this.context.api.getDocumentNodes()
    const countedElements = this.state.countedElements

    const words = _(nodes)
      .filter((node) => countedElements.some((el) => node.isInstanceOf(el)))
      .filter((node) => !!node.content)
      .map((node) => node.content.trim())
      .flatMap((paragraph) => paragraph.split(/\s+/))

    const charsCount = words.reduce((acc, word) => acc + word.length, 0)

    return {
      words: words.size(),
      chars: charsCount
    }
  }

  this.getCharCountModifier = function() {
    const target = this.getDocumentTargetCharCount()
    const actual = this.state.charCount
    const margin = target / 100 * parseFloat(this.state.margin)
    const min = target - margin
    const max = target + margin

    switch (true) {
      case (target == -1):                    return ''
      case (actual == target):                return 'perfect-range'
      case (actual < min):                    return 'under-range'
      case (actual > max):                    return 'over-range'
      case (actual >= min && actual <= max ): return 'in-range'
      default:                                return ''
    }
  }

  this.getDocumentTargetCharCount = function() {
    const availableSizes = this.state.availableSizes
    const documentSize = this.state.documentSize
    const maybeCharCount = availableSizes.find((size) => size.size == documentSize)

    if (maybeCharCount != undefined) {
      const charCount = parseInt(maybeCharCount.charCount)
      if (!Number.isNaN(charCount)) return charCount
    }

    return -1
  }
}

Component.extend(TextcountMainComponent);
module.exports = TextcountMainComponent;
