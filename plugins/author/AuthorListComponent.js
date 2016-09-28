'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var AuthorItem = require('./AuthorItemComponent');
var NilUUID = require('writer/utils/NilUUID');

function AuthorListComponent() {
  AuthorListComponent.super.apply(this, arguments);
  this.name = 'author';
}

AuthorListComponent.Prototype = function() {

  this.getIdForRef = function(author) {
    if (NilUUID.isNilUUID(author.uuid)) {
      return 'author-' + author.title.replace(' ', '');
    } else if (author.uuid) {
      return 'author-' + author.uuid;
    } else {
      console.console.warn('No UUID');
    }
  }

  this.render = function() {
    var existingAuthors = this.props.existingAuthors;
    var authorList = $$('ul').addClass('authors__list');

    existingAuthors.forEach(function(author) {
      authorList.append($$(AuthorItem, { author: author, removeAuthor: this.deleteAuthorAndReference.bind(this)}).ref(this.getIdForRef(author)));
    }.bind(this));
    return authorList;
  }

  this.deleteAuthorAndReference = function(author) {
    delete this.refs[this.getIdForRef(author)];
    this.props.removeAuthor(author);
  }
}

Component.extend(AuthorListComponent);
module.exports = AuthorListComponent;
