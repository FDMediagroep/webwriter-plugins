'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var $ = require('substance/util/jquery');
var genUUID = require('writer/utils/IdGenerator');

function LinkedarticlesComponent() {
  LinkedarticlesComponent.super.apply(this, arguments);
  this.name = 'linkedarticles';
}

LinkedarticlesComponent.Prototype = function() {

  this.getInitialState = function() {
    var links = this.getLinks();
    return { link1: links._1, link2: links._2 };
  };

  this.render = function() {
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
              .ref('link1')
              .setValue(this.state.link1)
              .on('blur', this.flush.bind(this)),
            $$('span')
              .append($$(Icon, { icon: 'fa-times' }))
              .on('click', function() {
                this.refs.link1.setValue('');
                this.flush()
              }.bind(this))
          ),
        $$('div')
          .append(
            $$('input')
              .addClass('form-control')
              .attr({ 'type': 'text', 'placeholder': this.context.i18n.t('Related Article 2') })
              .ref('link2')
              .setValue(this.state.link2)
              .on('blur', this.flush.bind(this)),
            $$('span')
              .append($$(Icon, { icon: 'fa-times' }))
              .on('click', function() {
                this.refs.links2.setValue('')
                this.flush();
              })
          ),
        $$('hr')
      );
  };

  this.flush = function() {

    if (this.outOfSync()) {

      // remove previous link
      this.context.api
        .getLinkByType(this.name, 'fdmg/linkedarticles')
        .forEach(function(link) {
          this.context.api.removeLinkByUUIDAndRel(this.name, link['@uuid'], link['@rel'] );
        }.bind(this));

      var link1 = this.refs.link1.val();
      var link2 = this.refs.link2.val();

      // if first is empty and second is set swap links
      if (!link1 && !!link2) {
        link1 = link2;
        link2 = '';
      }

      // add new link
      this.context.api.addLink(this.name, {
        '@rel': this.name,
        '@type': 'fdmg/linkedarticles',
        '@link1': link1,
        '@link2': link2,
        '@uuid': genUUID()
      });

      this.reloadLinks();
    }
  }

  this.getLinks = function() {
    return this.context.api
      .getLinkByType(this.name, 'fdmg/linkedarticles')
      .map(function(link) {
        return { _1: link['@link1'] || '', _2: link['@link2'] || '' };
      })
      .pop() || { _1: '', _2: '' };
  };

  this.reloadLinks = function() {
    var links = this.getLinks();
    this.setState({ link1: links._1, link2: links._2 });
  };

  this.outOfSync = function() {
    return this.state.link1 != this.refs.link1.val() || this.state.link2 != this.refs.link2.val();
  }
};

Component.extend(LinkedarticlesComponent);
module.exports = LinkedarticlesComponent;
