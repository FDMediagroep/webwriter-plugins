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
      const endpoint = this.context.api.getConfigValue('articletype', 'endpoint');
      const token = this.context.api.getConfigValue('articletype', 'token');
      var hostUrl = "";

      if (window.location.href.indexOf("webwriter") > -1) {
        var hostUrl = window.location.href;
      }

      $.ajax({
        url: this.context.api.router.getEndpoint() + "/api/resourceproxy?url=" + hostUrl + encodeURI(endpoint),
        method: "GET",
        dataType: "json",
        headers: {
            "Content-Type" : "application/json",
            "x-access-token" : token
        }
      })
      .done(function(result) {
        _articletypeItems = result.map((r) => {
          return {id: r.name, label: r.title}
        })
        this.extendState({items: _articletypeItems})
      }.bind(this))
      .error((err, xhr, text) => console.error(err, xhr, text));
    }
  };

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
          allowFreeInput: false,
          allowEmptySelection: false,
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
