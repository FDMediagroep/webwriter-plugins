/*

 ,_,
(0,0)
(   )
-"-"-

*/

'use strict'

const Component = require('substance/ui/Component')
const $$ = Component.$$
const Icon = require('substance/ui/FontAwesomeIcon')
const $ = require('substance/util/jquery')
const genUuid = require('writer/utils/IdGenerator')

function RelatedarticlesComponent() {
  RelatedarticlesComponent.super.apply(this, arguments)
  this.name = 'relatedarticle'
  this.type = 'fdmg/' + this.name
}

RelatedarticlesComponent.Prototype = function() {

  this.getInitialState = function() {
    return this.getState()
  }

  this.render = function() {
    return $$('div')
      .addClass('form-group relatedarticles-container')
      .append(
        $$('h2').append(this.context.i18n.t('Related articles')),
        $$('div')
          .append(
            $$('span')
              .append($$(Icon, {icon: 'fa-times'}))
              .on('click', function() {
                this.refs.first.setValue('')
                this.save()
              }.bind(this)),
            $$('input')
              .addClass('form-control')
              .attr({type: 'text', placeholder: this.context.i18n.t('Article URL')})
              .ref('first')
              .setValue(this.state.first)
              .on('blur', this.save.bind(this))
          ),
        $$('div')
          .append(
            $$('span')
              .append($$(Icon, {icon: 'fa-times'}))
              .on('click', function() {
                this.refs.second.setValue('')
                this.save()
              }.bind(this)),
            $$('input')
              .addClass('form-control')
              .attr({type: 'text', placeholder: this.context.i18n.t('Article URL')})
              .ref('second')
              .setValue(this.state.second)
              .on('blur', this.save.bind(this))
          ),
        $$('hr')
      )
  }

  this.save = function() {
    if (this.outOfSync()) {

      // remove previous links
      this.context.api
        .getLinkByType(this.name, this.type)
        .forEach(function(link) {
          this.context.api.removeLinkByUUIDAndRel(this.name, link['@uuid'], link['@rel'])
        }.bind(this))

      let firstUrl = this.refs.first.val()
      let secondUrl = this.refs.second.val()

      // if firstUrl is empty, swap values
      if (!firstUrl) firstUrl, secondUrl = secondUrl, firstUrl

      const firstId = this.extractId(firstUrl)
      const secondId = this.extractId(secondUrl)

      // if (firstId) {
        this.context.api.addLink(this.name, {
          '@type': this.type,
          '@rel': this.name,
          '@url': firstUrl,
          '@id': firstId,
          '@uuid': genUuid()
        })
      // }

      // if (secondId) {
        this.context.api.addLink(this.name, {
          '@type': this.type,
          '@rel': this.name,
          '@url': secondUrl,
          '@id': secondId,
          '@uuid': genUuid()
        })
      // }

      if (firstId || secondId) this.reloadState()
    }
  }

  this.getState = function() {
    const state = {}
    const xs = ['first', 'second']

    this.context.api
      .getLinkByType('relatedarticle', 'fdmg/relatedarticle')
      .forEach((link, i) => { state[xs[i]] = link['@url'] })

    return state
  }

  this.reloadState = function() {
    this.setState(this.getState())
  }

  this.outOfSync = function() {
    return this.state.first != this.refs.first.val() || this.state.second != this.refs.second.val()
  }

  this.extractId = function(url) {
    const res = (/^.*fd\.nl.*\/(\d+).*$/i).exec(url)

    if (res && res.length == 2) return res[1]

    return null
  }
}

Component.extend(RelatedarticlesComponent)
module.exports = RelatedarticlesComponent
