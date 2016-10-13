'use strict';

var LinkSelectorComponent = require('vendor/nl.fdmg/linkselector/LinkSelectorComponent');

var __articletype_state;

function ArticletypeComponent() { LinkSelectorComponent.apply(this, arguments); }

ArticletypeComponent.Prototype = function() {
    this.getInitialState = function() { return __articletype_state || LinkSelectorComponent.prototype.getInitialState.call(this); }

    this.initialize = function() {
        if (this.getState()['initialized?']) return;

        this.extendState({
            'initialized?': true,
            'pluginname': 'articletype',
            'plugintype': 'fdmg/articletype',
            'heading': this.context.i18n.t('Article type'),
            'forcelistmode?': true,
        });

        var endpoint = this.context.api.getConfigValue('articletype', 'endpoint');

        this.loadList(endpoint, function(items) {
            items = this
                .sortByAplhabet(items, 'title')
                .map(function(item) { return { 'id': item.name, 'label': item.title } });
            return items;
        }.bind(this));

        // check to see if we are disabled because of a redirectlink
        var redirectlink = this.context.api.getLinkByType('redirectlink', 'fdmg/redirectlink').pop();
        if (!!redirectlink && redirectlink['@checked'] === 'true') this.disableComponent();
    }

    this.didMount = function() {
        this.context.api.on('articletype', 'articletype:enable', this.enableComponent.bind(this));
        this.context.api.on('articletype', 'articletype:disable', this.disableComponent.bind(this));
    }

    this.dispose = function() {
        // remove any existing listeners first, dispatcher only allows one registry
        this.context.api.off('articletype', 'articletype:enable');
        this.context.api.off('articletype', 'articletype:disable');
    }

     // Override this so that we can get the correct label
    this.getExistingLinkOrDefault = function(name, type, prop) {
        var links = this.context.api.getLinkByType(name, type);
        var id = links.shift()[prop];
        var label = this.getItemLabelById(id);

        return { 'id': id, 'label': label };
    }

    this.setState = function(newstate) {
        __articletype_state = newstate;
        LinkSelectorComponent.prototype.setState.call(this, newstate);
    }
}

LinkSelectorComponent.extend(ArticletypeComponent);

module.exports = ArticletypeComponent;
