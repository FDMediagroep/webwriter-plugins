'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function RelatedarticleComponent() { RelatedarticleComponent.super.apply(this, arguments); }

RelatedarticleComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : 'Gerelateerde artikelen niet tonen' });
    }

}

SuperComponent.extend(RelatedarticleComponent);

module.exports = RelatedarticleComponent;
