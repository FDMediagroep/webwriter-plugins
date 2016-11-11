'use strict'

const Component = require('substance/ui/Component')
const Dropdown = require('vendor/nl.fdmg/dropdown/DropdownComponent')
const $$ = Component.$$
const $ = require('substance/util/jquery')
const genUuid = require('writer/utils/IdGenerator')

let _articletypeItems

function ArticletypeComponent() {
  ArticletypeComponent.super.apply(this, arguments)
}

ArticletypeComponent.Prototype = function() {

  this.getInitialState = function() {
    return {
      items: [],
      enabled: this.context.api
        .getLinkByType('redirectlink', 'fdmg/redirectlink')
        .every((link) => link['@checked'] != 'true')
    }
  }

  this.didMount = function() {

    // setup listeners for redirect article
    this.context.api.on('articletype', 'articletype:enable', this.enable.bind(this))
    this.context.api.on('articletype', 'articletype:disable', this.disable.bind(this))


    if (_articletypeItems) {
      this.extendState({items: _articletypeItems})
    } else {
      const endpoint = this.context.api.getConfigValue('articletype', 'endpoint')

      $.ajax(endpoint, {
        data: {
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        }
      })
      .done(function(result) {
        _articletypeItems = result.map((r) => {
          return {id: r.name, label: r.title}
        })

        this.extendState({items: _articletypeItems})
      }.bind(this))
      .error((err, xhr, text) => console.error(err, xhr, text))
    }
  }

  this.render = function() {
    const name = `articletype`
    const type = `fdmg/${name}`

    const api = this.context.api

    const initialSelection = api
      .getLinkByType(name, type)
      .map((link) => {return {id: link['@id'], label: link['@title']}})
      .pop()

    return $$('div')
      .addClass('fdmg-sidebar')
      .append(
        $$(Dropdown, {
          onSelect: (item) => {
            api
              .getLinkByType(name, type)
              .forEach((link) => api.removeLinkByUUIDAndRel(name, link['@uuid'], link['@rel']))

            api.addLink(name, {
              '@rel': name,
              '@type': type,
              '@id': item.id,
              '@title': item.label,
              '@uuid': genUuid()
            })
          },
          header: this.context.i18n.t('Article type'),
          items: this.state.items,
          allowFreeInput: true,
          allowEmptySelection: true,
          initialSelection: initialSelection,
          disabled: !this.state.enabled
        }),
        $$('hr')
      )
  }

  this.dispose = function() {
    this.context.api.off('articletype', 'articletype:enable')
    this.context.api.off('articletype', 'articletype:disable')
  }

  this.enable = function() {
    this.extendState({enabled: true})
  }

  this.disable = function() {
    this.extendState({enabled: false})
  }
}

Component.extend(ArticletypeComponent)
module.exports = ArticletypeComponent

// 'use strict';
//
// var LinkSelectorComponent = require('vendor/nl.fdmg/linkselector/LinkSelectorComponent');
//
// var __articletype_state;
//
// function ArticletypeComponent() { LinkSelectorComponent.apply(this, arguments); }
//
// ArticletypeComponent.Prototype = function() {
//     this.getInitialState = function() { return __articletype_state || LinkSelectorComponent.prototype.getInitialState.call(this); }
//
//     this.initialize = function() {
//         if (this.getState()['initialized?']) return;
//
//         this.extendState({
//             'initialized?': true,
//             'pluginname': 'articletype',
//             'plugintype': 'fdmg/articletype',
//             'heading': this.context.i18n.t('Article type'),
//             'forcelistmode?': true,
//         });
//
//         var endpoint = this.context.api.getConfigValue('articletype', 'endpoint');
//
//         this.loadList(endpoint, function(items) {
//             items = this
//                 .sortByAplhabet(items, 'title')
//                 .map(function(item) { return { 'id': item.name, 'label': item.title } });
//             return items;
//         }.bind(this));
//
//         // check to see if we are disabled because of a redirectlink
//         var redirectlink = this.context.api.getLinkByType('redirectlink', 'fdmg/redirectlink').pop();
//         if (!!redirectlink && redirectlink['@checked'] === 'true') this.disableComponent();
//     }
//
//     this.didMount = function() {
//         this.context.api.on('articletype', 'articletype:enable', this.enableComponent.bind(this));
//         this.context.api.on('articletype', 'articletype:disable', this.disableComponent.bind(this));
//     }
//
//     this.dispose = function() {
//         // remove any existing listeners first, dispatcher only allows one registry
//         this.context.api.off('articletype', 'articletype:enable');
//         this.context.api.off('articletype', 'articletype:disable');
//     }
//
//      // Override this so that we can get the correct label
//     this.getExistingLinkOrDefault = function(name, type, prop) {
//         var links = this.context.api.getLinkByType(name, type);
//         if (links.length < 1) {
//           return this.state.emptyitem;
//         } else {
//           var id = links.shift()[prop];
//           var label = this.getItemLabelById(id);
//
//           return { 'id': id, 'label': label };
//         }
//     }
//
//     this.setState = function(newstate) {
//         __articletype_state = newstate;
//         LinkSelectorComponent.prototype.setState.call(this, newstate);
//     }
// }
//
// LinkSelectorComponent.extend(ArticletypeComponent);
//
// module.exports = ArticletypeComponent;
