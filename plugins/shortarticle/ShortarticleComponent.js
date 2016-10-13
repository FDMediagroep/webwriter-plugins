'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function ShortarticleComponent() { ShortarticleComponent.super.apply(this, arguments); }

ShortarticleComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : this.context.i18n.t('Short article') });
    }

}

SuperComponent.extend(ShortarticleComponent);

module.exports = ShortarticleComponent;
