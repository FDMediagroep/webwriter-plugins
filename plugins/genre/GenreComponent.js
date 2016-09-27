'use strict';

var SuperComponent = require('vendor/nl.fdmg/linkselector/LinkSelectorComponent');

var __genre_state;

function GenreComponent() { GenreComponent.super.apply(this, arguments); }

GenreComponent.Prototype = function() {
    this.getInitialState = function() { return __genre_state || SuperComponent.prototype.getInitialState.call(this); }

    this.initialize = function() {
        if (this.getState()['initialized?']) return;

        this.extendState({
            'initialized?': true,
            'pluginname': 'genre',
            'plugintype': 'fdmg/genre',
            'heading': 'Genre'
        });

        // var endpoint = this.context.api.getConfigValue('genre', 'endpoint');

        var endpoint = this.context.api.call(
            'fdservices',
                {
                   method: 'get',
                   path: '/articles/genres',
                   query: {"sortOrder":"ascending"}
                }
            );
        console.log(endpoint);

        this.loadList(endpoint, function(items) {
            items = this
                .sortByAplhabet(items, 'genre')
                .map(function(item) { return { 'id': item.id, 'label': item.genre } });

            items.unshift(this.getState().emptyitem);

            return items
        }.bind(this));
    }

    this.setState = function(newstate) {
        __genre_state = newstate;
        SuperComponent.prototype.setState.call(this, newstate);
    }
}

SuperComponent.extend(GenreComponent);

module.exports = GenreComponent;
