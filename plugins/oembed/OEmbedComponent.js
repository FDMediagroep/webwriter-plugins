'use strict';

var Component = require('substance/ui/Component');
var TextComponent = require('substance/ui/TextPropertyComponent');
var Icon = require('substance/ui/FontAwesomeIcon');
var $$ = Component.$$;

function OEmbedComponent() {
    Component.apply(this, arguments);

    this.props.node.connect(this, {
        'oembednode:changed': this.nodeChanged
    });
}

OEmbedComponent.Prototype = function() {

    this.getInitialState = function() { return { hasLoadedContent: false }; };

    this.nodeChanged = function() { this.setState({ hasLoadedContent: true }); };

    this.render = function() {
        var node = this.props.node;
        var el = $$('a').attr('contenteditable', false)

        this.context.api.handleDrag(el, node);

        el.append(
            $$('div').append(
                $$(Icon, { icon: node.icon }).attr({ 'style': 'width: 18px; display: inline-block; color:' + node.color + ';' }),
                $$('strong').append(node.title).attr('contenteditable', false),
                $$('span')
                    .addClass('remove-button')
                    .append($$(Icon, { icon: 'fa-remove' }))
                    .on('click', this.removeEmbed)
                    .attr('title', this.context.i18n.t('Remove from article'))
                    .attr('contenteditable', false)
            )
            .addClass('header')
            .attr('contenteditable', false)
        );

        if (this.state.hasLoadedContent) {
            el.append($$('div)').attr('contenteditable', false).html(node.html));
        } else {
            el.append($$('div')
                .append(this.context.i18n.t('Loading Embed'))
                .append(node.url));
        }

        return $$('div').addClass('oembed__container').append(el);
    };

    this.removeEmbed = function() { this.context.api.deleteNode('oembed', this.props.node); }
}

Component.extend(OEmbedComponent);

module.exports = OEmbedComponent;
