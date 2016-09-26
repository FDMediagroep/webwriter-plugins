'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var EpicSearchComponent = require('./EpicSearchComponent');
var EpicListComponent = require('./EpicListComponent');

// var __epic_state;

function EpicMainComponent() { EpicMainComponent.super.apply(this, arguments); }

EpicMainComponent.Prototype = function() {

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
            existingItems: this.state.existingEpics,
            onSelect: this.addAuthor.bind(this),
            onCreate: this.createAuthor.bind(this),
            searchUrl: endpoint,
            createdAllowed: false,
            placeholderText: "Zoek epic"

        }).ref('epicSearchComponent');

        // var existingEpicsList = $$(EpicListComponent, {
        //     existingEpics: this.state.existingEpics,
        //     removeEpic: this.removeAuthor.bind(this)
        // }).ref('existingAuthorList');

        el.append(searchComponent);

        return el;

    };

}

Component.extend(EpicMainComponent);
module.exports = EpicMainComponent;