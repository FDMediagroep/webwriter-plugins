'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function TagItemComponent() {
  TagItemComponent.super.apply(this, arguments);
}

TagItemComponent.Prototype = function() {

  this.render = function() {
    var tag = this.props.tag;
    return $$('li')
      .addClass('tag-list__item')
      .ref('tagItem')
      .append(
        $$('span')
          .addClass('tag-item__title tag-item__title--no-avatar tag-item__title--notexisting')
          .append(tag.title)
          .attr('title', tag.title)
          .on('mouseenter', this.showHover)
          .on('mouseleave', this.hideHover),
        $$('span')
          .append(
            $$(Icon, { icon: 'fa-times'})
              .addClass('tag-icon tag-icon--delete')
              .attr('title', this.context.i18n.t('Removed from article'))
            )
          .on('click', function() { this.removeTag(tag); }.bind(this))
      );
  }

  this.showHover = function() {
    var delButton = this.$el.find('.tag-icon--delete');
    delButton.addClass('active');
  }

  this.hideHover = function(ev) {
    var delButton = this.$el.find('.tag-icon--delete');
    delButton.removeClass('active');
  }

  this.removeTag = function(tag) {
    this.$el.first().fadeOut(300, function() {
      this.props.removeTag(tag);
    }.bind(this));
  }
}

Component.extend(TagItemComponent);
module.exports = TagItemComponent;
