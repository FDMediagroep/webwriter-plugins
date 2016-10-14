'use strict';

var ArticleoptionsCOmponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function ShowrelatedarticlesComponent() { ShowrelatedarticlesComponent.super.apply(this, arguments); }

ShowrelatedarticlesComponent.Prototype = function() {

    this.initialize = function() {
        this.extendState({ 'text' : 'Gerelateerde artikelen niet tonen' });
    }
}

ArticleoptionsCOmponent.extend(ShowrelatedarticlesComponent);

module.exports = ShowrelatedarticlesComponent;
