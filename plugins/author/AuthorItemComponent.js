'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function AuthorItemComponent() {
  AuthorItemComponent.super.apply(this, arguments);
}

AuthorItemComponent.Prototype = function() {

  this.getInitialState = function() {
    return {};
  }

  this.render = function() {
    var author = this.props.author;

    var authorItem = $$('li')
      .addClass('authors__list-item')
      .addClass('clearfix')
      .ref('authorItem');

    var displayTitle = author.title;

    var deleteButton = $$('button')
      .addClass('author__button--delete')
      .append($$(Icon, { icon: 'fa-times' }))
      .attr('title', this.context.i18n.t('Remove from article'))
      .on('click', function() {
        this.removeAuthor(author);
      }.bind(this));

    this.populateElementsForSimpleAuthor(authorItem, displayTitle, deleteButton);
    authorItem.on('mouseenter', this.showHover);
    authorItem.on('mouseleave', this.hideHover);

    return authorItem;
  }

  this.populateElementsForSimpleAuthor = function(authorItem, displayTitle, deleteButton) {
    authorItem.append(
      $$('div')
        .addClass('avatar__container')
        .append($$('img').attr('src', this.context.api.router.getEndpoint() + '/asset/dummy.svg').addClass('avatar')))
        .append($$('div').addClass('metadata__container').append($$('span').append(displayTitle).addClass('author__name notClickable meta')).attr('title', this.context.i18n.t('Not editable author')))
        .append($$('div').addClass('button__container').append(deleteButton));
  }

  this.removeAuthor = function(author) {
    this.$el.first().fadeOut(300, function() {
      this.props.removeAuthor(author);
    }.bind(this));
  }

  this.showHover = function() {
    var delButton = this.$el.find('.author__button--delete');
    delButton.addClass('active');
  }

  this.hideHover = function() {
    var delButton = this.$el.find('.author__button--delete');
    delButton.removeClass('active');
  }
}

Component.extend(AuthorItemComponent);
module.exports = AuthorItemComponent;
