'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var jQuery = require('substance/util/jquery');
var Icon = require('substance/ui/FontAwesomeIcon');
var SearchComponent = require('vendor/nl.fdmg/universalsearch/UniversalSearchComponent');
var genUUID = require('writer/utils/IdGenerator');

function EpicMainComponent() {
  EpicMainComponent.super.apply(this, arguments);
  this.name = 'epic';
}

EpicMainComponent.Prototype = function() {

  this.getInitialState = function() {
    return {
      existingEpic: this.getExistingEpic()
    };
  };

  this.render = function() {

    var existingEpic = this.state.existingEpic;
    var epicEl = $$('span');

    var epicSearchComponent = 
      $$(SearchComponent, {
        existingItems: existingEpic ? [existingEpic] : [],
        doSearch: this.searchEpics.bind(this),
        onSelect: this.setEpic.bind(this),
        onCreate: this.setEpic.bind(this),
        createAllowed: true,
        placeholderText: this.context.i18n.t('Set Epic')
      }).ref('epicSearchComponent');

    if (existingEpic) {

      epicEl = $$('div').addClass('epic__item')
        .append(
          $$('div')
            .addClass('metadata__container')
            .append(
              $$('span')
              .addClass('epic__name notClickable meta')
              .append(existingEpic.name))
            .append(
              $$('button')
              .append($$(Icon, { icon: 'fa-times' }))
              .on('click', function() { this.removeEpic(); }.bind(this))
            )
        );

      epicSearchComponent.addClass('hidden');
    }

    return $$('div')
      .ref('epicContainer')
      .addClass('epic')
      .append(
        $$('h2').append(this.context.i18n.t('Epic')),
        epicEl, epicSearchComponent,
        $$('hr')
      );
  };

  this.reloadEpic = function() {
    this.extendState({
      existingEpic: this.getExistingEpic()
    });
  };

  this.getExistingEpic = function() {
    var links = this.context.api.getLinkByType(this.name, 'fdmg/epic');
    var epic = links.pop();

    if (!!epic) {
      return {
        id: epic['@id'],
        name: epic['@name']
      };
    }

    return null;
  };

  this.searchEpics = function(q, cb) {
    var endpoint = this.context.api.getConfigValue(this.name, 'endpoint');
    var token = this.context.api.getConfigValue(this.name, 'token');
    this.extendState({ isSearching: true });

    this.context.api.router.get(endpoint + q, {
      headers: {
        'X-Auth-Token' : token
      }
    }).done(function(items) {
      var epics = items.slice(0, 100).map(function(epic) {
        return {
          name: epic.title,
          id: epic.id
        }
      });
      cb(null, epics);
    }.bind(this))
      .error(function(error, xhr, text) {
      // TODO: Display error message
      console.error(error, xhr, text);
    }.bind(this)
    ).always(function() { this.extendState({ isSearching: false }); }.bind(this));
  };

  this.setEpic = function(epic) {
    this.removeEpic();

    var data = {
      '@rel': this.name,
      '@type': 'fdmg/epic',
      '@id': epic.id,
      '@name': epic.name,
      '@uuid': genUUID()
    };

    if ( epic.id === "__create-new") {
      delete data["@id"];
    }

    this.context.api.addLink(this.name, data);

    this.reloadEpic();
  };

  this.removeEpic = function(epic) {
    this.context.api.getLinkByType(this.name, 'fdmg/epic')
      .forEach(function(epic) {
        this.context.api.removeLinkByUUIDAndRel(this.name, epic['@uuid'], epic['@rel']);
      }.bind(this));

    jQuery("epic search__container").removeClass('hidden');

    this.reloadEpic();
  };
}

Component.extend(EpicMainComponent);
module.exports = EpicMainComponent;
