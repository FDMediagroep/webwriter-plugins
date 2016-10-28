'use strict'

const Component = require('substance/ui/Component')
const $$ = Component.$$

function SpinnerComponent() {
  SpinnerComponent.super.apply(this, arguments)
}

SpinnerComponent.Prototype = function() {
  this.render = function() {
    const el = $$('i')
      .addClass('fa fa-spinner fa-spin spinner')
    if (this.props.isSearching) {
      el.addClass('active')
    }
    return el
  }
}

Component.extend(SpinnerComponent)
module.exports = SpinnerComponent
