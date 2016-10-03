'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var TagSearchComponent = require('vendor/nl.fdmg/universalsearch/UniversalSearchComponent');
var TagListComponent = require('./TagListComponent');
var jQuery = require('substance/util/jquery');
var genUUID = require('writer/utils/IdGenerator');

function TagsMainComponent() {
  TagsMainComponent.super.apply(this, arguments);
  this.name = 'tags';
}

TagsMainComponent.Prototype = function() {

  this.getInitialState = function() {
    return {
      existingTags: this.context.api.getTags()
    };
  }

  this.render = function() {
    return $$('div')
      .ref('tagsContainer')
      .addClass('authors')
      .append(
        $$('h2').append(this.context.i18n.t('Tags')),
        $$(TagListComponent, {
          existingTags: this.state.existingTags,
          removeTag: this.removeTag.bind(this)
        }).ref('existingTagsList'),
        $$(TagSearchComponent, {
          existingItems: this.state.existingTags,
          doSearch: this.searchTags.bind(this),
          onSelect: this.addTag.bind(this),
          onCreate: this.addTag.bind(this),
          createAllowed: true,
          placeholderText: "Add tag"
        }).ref('tagSearchComponent'),
        $$('hr')
      );
  }

  this.reloadTags = function() {
    this.extendState({
      existingTags: this.context.api.getTags()
    });
  }

  this.searchTags = function(q, cb) {
    var endpoint = this.context.api.getConfigValue(this.name, 'endpoint');

    this.extendState({ isSearching: true });

    jQuery.ajax(endpoint + q, { 'data': { 'dataType': 'json' } })
      .done(function(items) {

        var tags = items.map(function(item) {
          return {
            rel: 'subject',
            title: item.tag,
            name: item.tag,
            type: 'x-im/category',
            uuid: 'tag-' + item.id,
            id: item.id
          }
        });

        cb(null, tags);
      }.bind(this))
      .fail(function(data, status, err) { console.error(err); cb(err, null); })
      .always(function() { this.extendState({ isSearching: false}); }.bind(this));
  }

  this.addTag = function(tag) {
    try {
      // custom object needed for addTag
      this.context.api.addTag(this.name, {
        name: [ tag.title ],
        uuid: tag.uuid,
        imType: [ tag.type ]
      });

      this.reloadTags();
    } catch (e) {
      console.log(e);
    }
  }

  this.removeTag = function(tag) {
    try {
      this.context.api.removeLinkByUUIDAndRel(this.name, tag.uuid, 'subject');
      this.reloadTags();
    } catch (e) {
      console.log(e);
    }
  }
}

Component.extend(TagsMainComponent);
module.exports = TagsMainComponent;
