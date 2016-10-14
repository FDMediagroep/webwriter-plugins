'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var $ = require('substance/util/jquery');
var genUUID = require('writer/utils/IdGenerator');

function RelatedarticlesComponent() {
  RelatedarticlesComponent.super.apply(this, arguments);
  this.name = 'relatedarticles';
  this.type = 'fdmg/relatedarticles';
}

RelatedarticlesComponent.Prototype = function() {

  this.getInitialState = function() {
    return this.getState();
  };

  this.render = function() {

    console.log('rend', this.state)

    return $$('div')
      .addClass('linkedarticles-container')
      .addClass('form-group')
      .append(
        $$('h2').append(this.context.i18n.t('Linked Articles')),
        $$('div')
          .append(
            $$('input')
              .addClass('form-control')
              .attr({ 'type': 'text', 'placeholder': this.context.i18n.t('Related Article 1') })
              .ref('_1')
              .setValue(this.state._1)
              .on('blur', this.flush.bind(this)),
            $$('span')
              .append($$(Icon, { icon: 'fa-times' }))
              .on('click', function() {
                this.refs._1.setValue('');
                this.flush()
              }.bind(this))
          ),
        $$('div')
          .append(
            $$('input')
              .addClass('form-control')
              .attr({ 'type': 'text', 'placeholder': this.context.i18n.t('Related Article 2') })
              .ref('_2')
              .setValue(this.state._2)
              .on('blur', this.flush.bind(this)),
            $$('span')
              .append($$(Icon, { icon: 'fa-times' }))
              .on('click', function() {
                this.refs.links2.setValue('')
                this.flush();
              }.bind(this))
          ),
        $$('hr')
      );
  };

  this.flush = function() {

    if (this.outOfSync()) {

      // remove previous link
      this.context.api
        .getLinkByType(this.name, this.type)
        .forEach(function(link) {
          this.context.api.removeLinkByUUIDAndRel(this.name, link['@uuid'], link['@rel'] );
        }.bind(this));

      var _1 = this.refs._1.val();
      var _2 = this.refs._2.val();

      // if first is empty and second is set swap links
      if (!_1 && !!_2) {
        _1 = _2;
        _2 = '';
      }

      if (_1) {
        this.context.api.addLink(this.name, {
          '@id': genUUID(),
          '@title': _1,
          '@rel': this.name,
          '@type': this.type,
          '@uuid': genUUID()
        });
      }

      if (_2) {
        this.context.api.addLink(this.name, {
          '@id': genUUID(),
          '@title': _2,
          '@rel': this.name,
          '@type': this.type,
          '@uuid': genUUID()
        });
      }

      this.reloadLinks();
    }
  }

  this.getState = function() {
    var state = {
      _1: '',
      _2: '',
    };

    this.context.api
      .getLinkByType('relatedarticles', 'fdmg/relatedarticles')
      .forEach(function(link, idx) {
        state['_' + (idx + 1)] = link['@title'];
      });

    return state;
  };

  this.reloadLinks = function() {
    this.setState(this.getState());
  };

  this.outOfSync = function() {
    return this.state._1 != this.refs._1.val() || this.state._2 != this.refs._2.val();
  };
};

Component.extend(RelatedarticlesComponent);
module.exports = RelatedarticlesComponent;
