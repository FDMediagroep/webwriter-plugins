'use strict'

const Component = require('substance/ui/Component')
const Dropdown = require('vendor/nl.fdmg/dropdown/DropdownComponent')
const $$ = Component.$$
const genUuid = require('writer/utils/IdGenerator')

function SectionComponent() {
  SectionComponent.super.apply(this, arguments)
}

SectionComponent.Prototype = function() {

  this.render = function() {
    const name = `section`
    const type = `fdmg/${name}`

    const api = this.context.api

    const items = api
      .getConfigValue(name, 'sectionlist')
      .map((s) => {return {id: s.name, label: s.title}})

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
          header: this.context.i18n.t('Section'),
          items: items,
          allowFreeInput: false,
          allowEmptySelection: false,
          initialSelection: initialSelection
        }),
        $$('hr')
      )
  }
}

Component.extend(SectionComponent)
module.exports = SectionComponent


// 'use strict';
//
// var SuperComponent = require('vendor/nl.fdmg/linkselector/LinkSelectorComponent');
// var jQuery = require('substance/util/jquery');
//
// var __section_state;
//
// function SectionComponent() { SectionComponent.super.apply(this, arguments); }
//
// SectionComponent.Prototype = function() {
//     this.getInitialState = function() { return __section_state || SuperComponent.prototype.getInitialState.call(this); }
//
//     this.initialize = function() {
//         if (this.getState()['initialized?']) return;
//
//         this.extendState({
//             'initialized?': true,
//             'pluginname': 'section',
//             'plugintype': 'fdmg/section',
//             'heading': this.context.i18n.t('Section'),
//             'forcelistmode?': true,
//             'labelProp' : '@id'
//         });
//
//         var sectionList = this.context.api.getConfigValue('section', 'sectionlist');
//
//         this.loadList(sectionList, function(items) {
//             items = sectionList
//                 .map(function(item) { return { 'id': item.name, 'label': item.title } });
//
//             items.unshift(this.getState().emptyitem);
//
//             return items;
//         }.bind(this));
//     }
//
//     this.loadList = function(sectionList, mapper) {
//         var sectionList = this.setItems(mapper(sectionList));
//
//         return sectionList;
//     }
//
//     // Override this so that we can get the correct label
//     this.getExistingLinkOrDefault = function(name, type, prop) {
//         var links = this.context.api.getLinkByType(name, type);
//
//         if (links.length == 0) {
//             return this.getState().emptyitem;
//         } else {
//             var id = links.shift()[prop];
//             var label = this.getItemLabelById(id);
//
//             if (label == -1) {
//                 this.removeLink();
//                 return  { 'id': "", 'label': "" };
//             }
//
//             return { 'id': id, 'label': label };
//         }
//     }
//
//     this.removeLink = function () {
//         var api = this.context.api;
//         // remove existing section (bcause it didn't map with existing list).
//         api.getLinkByType("section", "fdmg/section")
//         .forEach(function(link) {
//             api.removeLinkByUUIDAndRel(name, link['@uuid'], link['@rel']);
//         });
//     }
//
//     this.getItemLabelById = function(id) {
//         var item = this.getState().items
//             .filter(function(item) { return item.id === id; })
//             .pop();
//         return item ? item.label : -1;
//     }
//
//     this.setState = function(newstate) {
//         __section_state = newstate;
//         SuperComponent.prototype.setState.call(this, newstate);
//     }
// }
//
// SuperComponent.extend(SectionComponent);
//
// module.exports = SectionComponent;
