'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function PaywallComponent() { PaywallComponent.super.apply(this, arguments); }

PaywallComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : this.context.i18n.t('Free article') });
    }

}

SuperComponent.extend(PaywallComponent);

module.exports = PaywallComponent;
