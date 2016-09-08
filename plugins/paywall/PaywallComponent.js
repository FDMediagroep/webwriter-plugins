'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function PaywallComponent() { PaywallComponent.super.apply(this, arguments); }

PaywallComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : 'Gratis artikel' });
    }

}

SuperComponent.extend(PaywallComponent);

module.exports = PaywallComponent;
