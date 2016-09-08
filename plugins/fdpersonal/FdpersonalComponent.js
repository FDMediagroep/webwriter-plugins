'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function FdpersonalComponent() { FdpersonalComponent.super.apply(this, arguments); }

FdpersonalComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : 'FD Persoonlijk' });
    }

}

SuperComponent.extend(FdpersonalComponent);

module.exports = FdpersonalComponent;
