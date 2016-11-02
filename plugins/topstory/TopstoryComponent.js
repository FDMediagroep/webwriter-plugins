'use strict';

var ArticleoptionsComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function TopstoryComponent() { TopstoryComponent.super.apply(this, arguments); }

TopstoryComponent.Prototype = function() {

    this.initialize = function() {
        this.extendState({
        	'text' : this.context.i18n.t('Topstory'),
        	'input' : true,
        	'value' : this.getDocumentTopstoryOrNull(),
        	'placeholder' : this.context.i18n.t('Topstory text')
        });
    }

    this.getDocumentTopstoryOrNull = function() {
        return this.context.api
            .getLinkByType('topstory', 'fdmg/topstory')
            .map( function (item){ return item['@value']; })
            .pop();
    }

    this.render = function() {

        return ArticleoptionsComponent.prototype.render.call(this);
    }
}

ArticleoptionsComponent.extend(TopstoryComponent);
module.exports = TopstoryComponent;
