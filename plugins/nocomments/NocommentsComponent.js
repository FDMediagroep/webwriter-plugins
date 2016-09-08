'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function NocommentsComponent() { NocommentsComponent.super.apply(this, arguments); }

NocommentsComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : 'Commentaar uitschakelen' });
    }

}

SuperComponent.extend(NocommentsComponent);

module.exports = NocommentsComponent;
