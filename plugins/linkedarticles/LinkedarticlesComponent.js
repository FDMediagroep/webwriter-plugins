'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var $ = require('substance/util/jquery');
var genUUID = require('writer/utils/IdGenerator');

function LinkedarticlesComponent() {
  LinkedarticlesComponent.super.apply(this, arguments);
  this.name = 'linkedarticles';
}

LinkedarticlesComponent.Prototype = function() {

  this.getInitialState = function() {
    var links = this.getLinks();
    console.log(links)

    return {
      link1: links._1,
      link2: links._2
    };
  };

  this.render = function() {
    return $$('div')
      .append(
        $$('h2').append(this.context.i18n.t('Linked Articles')),
        $$('input')
          .attr({
            'type': 'text',
            'value': this.state.link1,
            'placeholder': this.context.i18n.t('Related Article 1')
          })
          .ref('link1')
          .on('blur', this.flushLinks.bind(this)),
          $$('input')
            .attr({
              'id': 'linkedarticles-link-2',
              'type': 'text',
              'value': this.state.link2,
              'placeholder': this.context.i18n.t('Related Article 2')
            })
            .ref('link2')
            .on('blur', this.flushLinks.bind(this))
      );
  };

  this.flushLinks = function() {
    // remove previous link
    this.context.api
      .getLinkByType(this.name, 'fdmg/linkedarticles')
      .forEach(function(link) {
        this.context.api.removeLinkByUUIDAndRel(
          this.name,
          link['@uuid'],
          link['@rel']);
      }.bind(this));

    // add new link
    this.context.api.addLink(this.name, {
      '@rel': this.name,
      '@type': 'fdmg/linkedarticles',
      '@link1': this.refs.link1.val(),
      '@link2': this.refs.link2.val(),
      '@uuid': genUUID()
    });

    this.reloadLinks();
  }

  this.getLinks = function() {
    return this.context.api
      .getLinkByType(this.name, 'fdmg/linkedarticles')
      .map(function(link) {
        return {
          _1: link['@link1'] || '',
          _2: link['@link2'] || ''
        };
      })
      .pop() || {
        _1: '',
        _2: ''
      };
  };

  this.reloadLinks = function() {
    var links = this.getLinks();
    this.setState({
      link1: links._1,
      link2: links._2
    });
  };
};

Component.extend(LinkedarticlesComponent);
module.exports = LinkedarticlesComponent;
