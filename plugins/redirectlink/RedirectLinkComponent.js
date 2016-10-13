'use strict';

var ArticleoptionsComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function RedirectLinkComponent() { RedirectLinkComponent.super.apply(this, arguments); }

RedirectLinkComponent.Prototype = function() {

    this.initialize = function() {
        this.extendState({
        	'text' : this.context.i18n.t('Redirect article'),
        	'input' : true,
        	'value' : this.getDocumentRedirectLinkOrNull(),
        	'placeholder' : this.context.i18n.t('URL to article')
        });
    }

    this.getDocumentRedirectLinkOrNull = function() {
        return this.context.api
            .getLinkByType('redirectlink', 'fdmg/redirectlink')
            .map( function (item){ return item['@value']; })
            .pop();
    }

    this.render = function() {
        this.context.api.triggerEvent('', 'articletype:' + (this.getState().checked ? 'disable' : 'enable'));

        return ArticleoptionsComponent.prototype.render.call(this);
    }
}

ArticleoptionsComponent.extend(RedirectLinkComponent);
module.exports = RedirectLinkComponent;
