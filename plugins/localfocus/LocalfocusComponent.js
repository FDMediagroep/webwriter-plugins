'use strict';

var Component = require('substance/ui/Component');
var Icon = require('substance/ui/FontAwesomeIcon');
var $$ = Component.$$;

function LocalfocusComponent() {
  LocalfocusComponent.super.apply(this, arguments);
  this.name = 'localfocus';
}

LocalfocusComponent.Prototype = function() {

  this.render = function() {

    var container = $$('div').addClass('localfocus__container');

    var header = $$('a')
      .attr('contenteditable', false)
      .append(
        $$('div').append(
          $$(Icon, { icon: 'fa-pie-chart' }).attr({ 'style': 'width: 18px; display: inline-block; color: #ab0015;' }),
          $$('strong').append('Local Focus').attr('contenteditable', false),
          $$('span')
            .addClass('remove-button')
            .append($$(Icon, { icon: 'fa-remove' }))
            .on('click', this.remove)
            .attr('title', this.context.i18n.t('Remove from article'))
            .attr('contenteditable', false)
        )
        .addClass('header')
        .attr('contenteditable', false)
      );

    var content = $$('div')
        .attr('contenteditable', false)
        .html('<iframe class="localfocusvisual" frameborder="0" style="width:100%; height:500px; overflow:hidden" src="' + this.props.node.url + '"></iframe>');

    this.context.api.handleDrag(header, this.props.node);

    return container.append(header.append(content));
  };

  this.remove = function() {
    this.context.api.deleteNode(this.node, this.props.node);
  };
};

Component.extend(LocalfocusComponent);

module.exports = LocalfocusComponent;
