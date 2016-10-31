'use strict';

var SuperComponent = require('vendor/nl.fdmg/articleoptions/ArticleoptionsComponent');

function CommentsComponent() { CommentsComponent.super.apply(this, arguments); }

CommentsComponent.Prototype = function() {

    this.initialize = function() {

        this.extendState({ 'text' : this.context.i18n.t('Enable comments')  });
    }

}

SuperComponent.extend(CommentsComponent);

module.exports = CommentsComponent;
