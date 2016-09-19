'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
//var AuthorSearchComponent = require('./AuthorSearchComponent');
var AuthorSearchComponent = require('writer/components/form-search/FormSearchComponent');
var NilUUID = require('writer/utils/NilUUID');
var AuthorListComponent = require('./AuthorListComponent');


/**
 * Main component for handling Authors
 * @constructor
 */
function AuthorMainComponent() {
    AuthorMainComponent.super.apply(this, arguments);

    this.name = 'author';
}

AuthorMainComponent.Prototype = function () {
    this.didMount = function () {
    };

    /**
     * Get existing auhtor from the API
     * @returns {{existingAuthors: *}}
     */
    this.getInitialState = function () {
        return {
            existingAuthors: this.context.api.getAuthors()
        };
    };


    this.reloadAuthors = function () {
        this.extendState({
            existingAuthors: this.context.api.getAuthors()
        });
    };

    this.render = function () {

        var el = $$('div').ref('authorContainer').addClass('authors').append($$('h2').append(this.context.i18n.t('Author')));

        var authorSearchUrl = this.context.api.router.getEndpoint();

        var searchComponent = $$(AuthorSearchComponent, {
            existingItems: this.state.existingAuthors,
            searchUrl: authorSearchUrl+'/api/search/concepts/authors?q=',
            onSelect: this.addAuthor.bind(this),
            onCreate: this.createAuthor.bind(this),
            createAllowed: true,
            placeholderText: "Add author"
        }).ref('authorSearchComponent');

        var existingAuthorsList = $$(AuthorListComponent, {
            existingAuthors: this.state.existingAuthors,
            removeAuthor: this.removeAuthor.bind(this)
        }).ref('existingAuthorList');

        var hr = $$('hr');

        el.append(existingAuthorsList);
        el.append(searchComponent);
        el.append(hr);

        return el;

    };

    /**
     * @param author
     */
    this.removeAuthor = function (author) {
        try {
            if(NilUUID.isNilUUID(author.uuid)) {
                this.context.api.removeAuthorByTitle(this.name, author.title);
            } else {
                this.context.api.removeAuthorByUUID(this.name, author.uuid);
            }
            this.reloadAuthors();
        } catch (e) {
            console.log(e);
        }
    };

    this.addAuthor = function (author) {
        try {
            this.context.api.addAuthor(this.name, author);
            this.reloadAuthors();
        } catch (e) {
            console.log("e", e);
        }
    };

    this.createAuthor = function(authorTemp) {
        this.context.api.addSimpleAuthor(this.name, authorTemp.inputValue);
        this.reloadAuthors();
    };

};

Component.extend(AuthorMainComponent);
module.exports = AuthorMainComponent;
