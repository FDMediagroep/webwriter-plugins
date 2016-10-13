'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function NocommentsComponent() { NocommentsComponent.super.apply(this, arguments); }

NocommentsComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : this.context.i18n.t('Disable comments')  });
    }

}

SuperComponent.extend(NocommentsComponent);

module.exports = NocommentsComponent;
