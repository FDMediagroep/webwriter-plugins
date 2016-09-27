'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;

function SpinnerComponent() {
  SpinnerComponent.super.apply(this, arguments);
}

SpinnerComponent.Prototype = function() {
  this.render = function() {
    var el = $$('i').addClass('fa fa-spinner fa-spin form__search--spinner').ref('searchInputSpinner');
    if (this.props.isSearching) {
      el.addClass('active');
    }
    return el;
  };
}

Component.extend(SpinnerComponent);

module.exports = SpinnerComponent;
