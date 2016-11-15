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
      .map((item) => {
        const match = items.find((i) => item.id == i.id)

        let label
        if (match != undefined) {
          label = match.label
        } else {
          label = item.label
        }

        return {id: item.id, label: label}
      })
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
