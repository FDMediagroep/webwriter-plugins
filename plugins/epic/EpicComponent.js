'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var EpicSearchComponent = require('./EpicSearchComponent');

// var __epic_state;

function EpicComponent() { EpicComponent.super.apply(this, arguments); }

EpicComponent.Prototype = function() {

    this.getInitialState = function () {
        return {
            existingEpics: this.context.api.getAuthors()
        };
    };

    this.render = function () {
        var endpoint = this.context.api.getConfigValue('epic', 'endpoint');

        var el = $$('div').ref('epicContainer').addClass('epic').append($$('h2').append('Epic'));

        // Have to fix this

        var searchComponent = $$(EpicSearchComponent, {
            // existingItems: this.state.existingEpics,
            searchUrl: endpoint,
            createdAllowed: false,
            placeholderText: "Zoek epic"

        }).ref('epicSearchComponent');

        var existingEpicsList = $$(EpicListComponent, {
            existingEpics: this.state.existingEpics,
            removeEpic: this.removeAuthor.bind(this)
        }).ref('existingAuthorList');

        el.append(searchComponent);

        return el;

    };

}

Component.extend(EpicComponent);
module.exports = EpicComponent;