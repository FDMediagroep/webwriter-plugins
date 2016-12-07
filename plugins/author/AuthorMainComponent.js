'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var AuthorSearchComponent = require('vendor/nl.fdmg/universalsearch/UniversalSearchComponent');
var NilUUID = require('writer/utils/NilUUID');
var AuthorListComponent = require('./AuthorListComponent');
var jQuery = require('substance/util/jquery');

function AuthorMainComponent() {
  AuthorMainComponent.super.apply(this, arguments);
  this.name = 'author';
}

AuthorMainComponent.Prototype = function() {

  this.getInitialState = function() {
    return {
      existingAuthors: this.getExistingAuthors()
    };
  }

  this.render = function() {
    return $$('div')
      .ref('authorContainer')
      .addClass('authors')
      .append(
        $$('h2').append(this.context.i18n.t('Author')),
        $$(AuthorListComponent, {
          existingAuthors: this.state.existingAuthors,
          removeAuthor: this.removeAuthor.bind(this)
        }).ref('existingAuthorsList'),
        $$(AuthorSearchComponent, {
          existingItems: this.state.existingAuthors,
          doSearch: this.searchAuthors.bind(this),
          onSelect: this.addAuthor.bind(this),
          onCreate: this.createAuthor.bind(this),
          createAllowed: true,
          placeholderText: this.context.i18n.t('Add author')
        }).ref('authorSearchComponent'),
        $$('hr')
      );
  }

  this.reloadAuthors = function() {
    this.extendState({
      existingAuthors: this.getExistingAuthors()
    });
  }

  this.getExistingAuthors = function() {
    var authors = this.context.api.getAuthors();

    return authors.map(function(author) {
      author['name'] = author.title;
      return author;
    });
  }

  this.searchAuthors = function(q, cb) {
    var endpoint = this.context.api.getConfigValue(this.name, 'endpoint');
    var token = this.context.api.getConfigValue(this.name, 'token');
    var hostUrl = "";

    if (window.location.href.indexOf("webwriter") > -1) {
      var hostUrl = window.location.href;
    }

    this.extendState({ isSearching: true });
    $.ajax({
        method: "GET",
        dataType: "json",
        url: this.context.api.router.getEndpoint() + "/api/resourceproxy?url=" + hostUrl + encodeURI(endpoint + q),
        headers: {
            "Content-Type" : "application/json",
            "x-access-token" : token
        }
    })
    .done(function(items) {
      var authors = items.slice(0, 100).map(function(item) {
        return {
          rel: 'author',
          name: item.fullName,
          title: item.fullName,
          type: 'x-im/author',
          uuid: item.id,
          id: item.id
        };
      });
      cb(null, authors);
    }.bind(this))
      .error(function(error, xhr, text) {
      // TODO: Display error message
      console.error(error, xhr, text);}.bind(this))
    .always(function() { this.extendState({ isSearching: false }); }.bind(this));
  };

  this.addAuthor = function(author) {
    console.log(author, "author");
    console.log(this.context.api, 'api addauthor');
    try {
      this.context.api.addAuthor(this.name, author);
      this.reloadAuthors();
    } catch (e) {
      console.log(e);
    }
  }

  this.createAuthor = function(authorTemp) {
    this.context.api.addSimpleAuthor(this.name, authorTemp.name);
    this.reloadAuthors();
  }

  this.removeAuthor = function(author) {
    try {
      if (NilUUID.isNilUUID(author.uuid)) {
        this.context.api.removeAuthorByTitle(this.name, author.title);
      } else {
        this.context.api.removeAuthorByUUID(this.name, author.uuid);
      }
      this.reloadAuthors();
    } catch (e) {
      console.log(e);
    }
  }
}

Component.extend(AuthorMainComponent);
module.exports = AuthorMainComponent;
