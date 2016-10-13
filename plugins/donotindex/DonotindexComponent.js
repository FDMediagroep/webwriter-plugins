'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function DonoitindexComponent() { DonoitindexComponent.super.apply(this, arguments); }

DonoitindexComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : this.context.i18n.t('Do not index') });
    }

}

SuperComponent.extend(DonoitindexComponent);

module.exports = DonoitindexComponent;
