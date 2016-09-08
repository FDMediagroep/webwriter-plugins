'use strict';

var SuperComponent = require('vendor/nl.fdmg/linkselector/LinkSelectorComponent');

var __section_state;

function SectionComponent() { SectionComponent.super.apply(this, arguments); }

SectionComponent.Prototype = function() {
    this.getInitialState = function() { return __section_state || SuperComponent.prototype.getInitialState.call(this); }

    this.initialize = function() {
        if (this.getState()['initialized?']) return;

        this.extendState({
            'initialized?': true,
            'pluginname': 'section',
            'plugintype': 'fdmg/section',
            'heading': 'Sectie',
            'forcelistmode?': true
        });

        var endpoint = this.context.api.getConfigValue('section', 'endpoint');

        this.loadList(endpoint, function(items) {
            items = this
                .sortByAplhabet(items, 'title')
                .map(function(item) { return { 'id': item.name, 'label': item.title } });

            items.unshift(this.getState().emptyitem);
            
            return items;
        }.bind(this));
    }

    // Override this so that we can get the correct label
    this.getExistingLinkOrDefault = function(name, type, prop) {

        var links = this.context.api.getLinkByType(name, type);

        if (links.length == 0) {
            console.log('no initial ' + this.getState().pluginname);
        } else {
            var id = links.shift()[prop];
            var label = this.getItemLabelById(id);

            console.log('initial ' + this.getState().pluginname + ' is ' + label);

            return { 'id': id, 'label': label };
        }
    }

    this.setState = function(newstate) {
        __section_state = newstate;
        SuperComponent.prototype.setState.call(this, newstate);
    }
}

SuperComponent.extend(SectionComponent);

module.exports = SectionComponent;
