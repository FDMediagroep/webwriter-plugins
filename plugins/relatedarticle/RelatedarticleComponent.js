'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function RelatedarticleComponent() { RelatedarticleComponent.super.apply(this, arguments); }

RelatedarticleComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : this.context.i18n.t('Do not show related articles') });
    }

}

SuperComponent.extend(RelatedarticleComponent);

module.exports = RelatedarticleComponent;
