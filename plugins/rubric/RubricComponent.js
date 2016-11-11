'use strict'

const Component = require('substance/ui/Component')
const Dropdown = require('vendor/nl.fdmg/dropdown/DropdownComponent')
const $$ = Component.$$
const $ = require('substance/util/jquery')
const genUuid = require('writer/utils/IdGenerator')

let _rubricItems

function RubricComponent() {
  RubricComponent.super.apply(this, arguments)
}

RubricComponent.Prototype = function() {

  this.getInitialState = function() {
    return {items: []}
  }

  this.didMount = function() {
    if (_rubricItems) {
      this.extendState({items: _rubricItems})
    } else {
      const endpoint = this.context.api.getConfigValue('rubric', 'endpoint')

      $.ajax(endpoint, {
        data: {
          dataType: 'json',
          contentType: 'application/json; charset=utf-8'
        }
      })
      .done(function(result) {
        _rubricItems = result.map((r) => {
          return {id: r.id, label: r.rubric}
        })

        this.extendState({items: _rubricItems})
      }.bind(this))
      .error((err, xhr, text) => console.error(err, xhr, text))
    }
  }

  this.render = function() {
    const name = `rubric`
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
              '@uuid': genUuid(),
            })
          },
          header: this.context.i18n.t('Rubric'),
          items: this.state.items,
          allowFreeInput: true,
          allowEmptySelection: true,
          initialSelection: initialSelection
        }),
        $$('hr')
      )
  }
}

Component.extend(RubricComponent)
module.exports = RubricComponent
