'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var TagItem = require('./TagItemComponent');

function TagListComponent() {
  TagListComponent.super.apply(this, arguments);
  this.name = 'tags';
}

TagListComponent.Prototype = function() {

  this.render = function() {
    var tags = this.props.existingTags;
    var tagList = $$('ul').addClass('tag-list');
    var tagEls = tags.map(function(tag) {
      return $$(TagItem, {
        tag: tag,
        removeTag: this.removeTag.bind(this)
      }).ref('tag-' + tag.uuid);
    }, this);

    tagList.append(tagEls);

    return tagList;
  }

  this.removeTag = function(tag) {
    delete this.refs['tag-' + tag.uuid];
    this.props.removeTag(tag);
  }
}

Component.extend(TagListComponent);
module.exports = TagListComponent;
