'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function BreakingarticleComponent() { BreakingarticleComponent.super.apply(this, arguments); }

BreakingarticleComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : 'Breaking artikel' });
    }

}

SuperComponent.extend(BreakingarticleComponent);

module.exports = BreakingarticleComponent;
