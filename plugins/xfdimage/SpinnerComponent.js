'use strict'

const Component = require('substance/ui/Component')
const $$ = Component.$$

function SpinnerComponent() {
  SpinnerComponent.super.apply(this, arguments)
}

SpinnerComponent.Prototype = function() {

  this.render = function() {
    return $$('i')
      .addClass('fa fa-spinner fa-spin spinner')
      .addClass(this.props.isSearching ? 'active': '')
  }
}

Component.extend(SpinnerComponent)
module.exports = SpinnerComponent
