'use strict'

const Component = require('substance/ui/Component')
const DropdownComponent = require('vendor/nl.fdmg/dropdown/DropdownComponent')
const $$ = Component.$$
const genUuid = require('writer/utils/IdGenerator')

function TestyComponent() {
  TestyComponent.super.apply(this, arguments)
}

TestyComponent.Prototype = function() {

  this.render = function() {
    const api = this.context.api

    const selection = api
      .getLinkByType('section', 'fdmg/section')
      .map((link) => { return {id: link['@id'], label: link['@title']}})
      .pop()

    const items = api
      .getConfigValue('section', 'sectionlist')
      .map((s) => {return {id: s.name, label: s.title}})

    return $$('div')
      .addClass('fdmg-sidebar')
      .append(
        $$(DropdownComponent, {
          onSelect: (item) => {
            api
              .getLinkByType('section', 'fdmg/section')
              .forEach((link) => api.removeLinkByUUIDAndRel('section', link['@uuid'], link['@rel']))

            api.addLink('section', {
              '@rel': 'section',
              '@type': 'fdmg/section',
              '@id': item.id,
              '@title': item.label,
              '@uuid': genUuid()
            })
          },
          header: this.context.i18n.t('Section'),
          items: items,
          allowFreeInput: false,
          allowEmptySelection: false,
          initialSelection: selection
        }),
        $$('hr')
      )
  }
}

Component.extend(TestyComponent)
module.exports = TestyComponent
