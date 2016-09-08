'use strict';

var SuperComponent = require('vendor/nl.fdmg/linkselector/LinkSelectorComponent');

var __rubric_state;

function RubricComponent() { SuperComponent.super.apply(this, arguments); }

RubricComponent.Prototype = function() {
    this.getInitialState = function() { return __rubric_state || SuperComponent.prototype.getInitialState.call(this); }

    this.initialize = function() {
        if (this.getState()['initialized?']) return;

        this.extendState({
            'initialized?': true,
            'pluginname': 'rubric',
            'plugintype': 'fdmg/rubric',
            'heading': 'Rubriek'
        });

        var endpoint = this.context.api.getConfigValue('rubric', 'endpoint');

        this.loadList(endpoint, function(items) {
            items = this
                .sortByAplhabet(items, 'rubric')
                .map(function(item) { return { 'id': item.id, 'label': item.rubric }});

            items.unshift(this.getState().emptyitem);

            return items
        }.bind(this));
    }

    this.setState = function(newstate) {
        __rubric_state = newstate;
        SuperComponent.prototype.setState.call(this, newstate);
    }
}

SuperComponent.extend(RubricComponent);

module.exports = RubricComponent;
