'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var TagSearchComponent = require('vendor/nl.fdmg/universalsearch/UniversalSearchComponent');
var TagListComponent = require('./TagListComponent');
var $ = require('substance/util/jquery');
var genUUID = require('writer/utils/IdGenerator');

function TagsMainComponent() {
  TagsMainComponent.super.apply(this, arguments);
  this.name = 'tags';
}

TagsMainComponent.Prototype = function() {

  this.getInitialState = function() {
    return {
      existingTags: this.getExistingTags()
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
          createAllowed: false,
          placeholderText: this.context.i18n.t('Add tag')
        }).ref('tagSearchComponent'),
        $$('hr')
      );
  }

  this.getExistingTags = function() {
    var tags = this.context.api.getTags();

    return tags.map(function(tag) {
      tag['name'] = tag.title;
      return tag;
    });
  }

  this.searchTags = function(q, cb) {
    var endpoint = this.context.api.getConfigValue(this.name, 'endpoint');
    var token = this.context.api.getConfigValue(this.name, 'token');

    this.extendState({ isSearching: true });
    $.ajax({
        method: "GET",
        dataType: "json",
        url: this.context.api.router.getEndpoint() + "/api/resourceproxy?url=" + encodeURI(endpoint + q),
        headers: {
            "Content-Type" : "application/json",
            "x-access-token" : token
        }
    })
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
      .error(function(error, xhr, text) {
      // TODO: Display error message
      console.error(error, xhr, text);}.bind(this))
    .always(function() { this.extendState({ isSearching: false }); }.bind(this));
  };

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

  this.reloadTags = function() {
    this.extendState({
      existingTags: this.getExistingTags()
    });

    this.saveTagList()
  }

  this.saveTagList = function() {
    const endpoint = this.context.api.getConfigValue(this.name, 'updateEndpoint')

    let id = this.context.api.getIdForArticle()
    if (id.indexOf('-') > -1) id = id.substring(id.indexOf('-') + 1)

    $.ajax({
      url: endpoint + id,
      method: 'PUT',
      data: JSON.stringify(this.state.existingTags.map((tag) => tag.name)),
      contentType: 'application/json',
      dataType: 'json'
    })
      .fail((data, status, err) => { console.error(err) })
  }
}

Component.extend(TagsMainComponent);
module.exports = TagsMainComponent;
