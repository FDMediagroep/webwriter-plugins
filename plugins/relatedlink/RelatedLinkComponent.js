'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function RelatedLinkComponent() {
    Component.apply(this, arguments);
}

RelatedLinkComponent.Prototype = function() {

    this.render = function() {

        var prefix = $$(TextProperty, {
                        tagName: 'div',
                        name: 'prefix',
                        path: [this.props.node.id, 'prefix']
                    }).addClass('prefix').attr({'contentEditable' : true, "data-text" : "Lees ook"}).ref('prefix');

        var leadText =  $$(TextProperty, {
                        tagName: 'div',
                        name: 'leadtext',
                        path: [this.props.node.id, 'leadtext']
                    }).addClass('leadtext').attr({'contentEditable' : true, "data-text" : "Titel van artikel"}).ref('leadtext');

        var relatedUrl =  $$(TextProperty, {
                        tagName: 'div',
                        name: 'relatedurl',
                        path: [this.props.node.id, 'relatedurl']
                    }).addClass('relatedurl').attr({'contentEditable' : true, "data-text" : "https://www.fd.nl"}).ref('relatedurl');

        var el = $$('a').append([
                    $$('div').addClass('header').append([
                        $$(Icon, {icon: 'fa-angle-right'}).addClass('plugin-icon'),
                        $$('div').addClass('plugin-title').append("Uitstapmoment"),
                        $$('span').addClass('remove-button').append(
                            $$(Icon, {icon: 'fa-remove'})
                        ).on('click', this.removeRelatedLink)
                        .attr('title', this.context.i18n.t('Verwijderen uit artikel'))
                    ]),
                    prefix,
                    leadText,
                    relatedUrl
                ]).addClass('fdmg-relatedlink fdmg-box').attr('contentEditable', false);

        this.context.api.handleDrag(
            el,
            this.props.node
        );

        this.context.api.on('publish-button', 'document:startsaving', function () {
           this.updateRelatedLink();
        }.bind(this));

        return el;
    };

    this.reRender = function () {}

    this.updateRelatedLink = function () {
        if (typeof(this.props.node.prefix) !== 'undefined' && typeof(this.props.node.leadText)!== 'undefined' && typeof(this.props.node.relatedUrl)!== 'undefined' ) {
            this.updateProps(
               this.refs.prefix.text(), this.refs.leadText.text(), this.refs.relatedUrl.text()  
            );
        }
    }

    this.removeRelatedLink = function() {
        this.context.api.deleteNode('relatedlink', this.props.node);
    };

    this.updateProps = function (prefix, leadText) {
        var prefix = this.props.node.prefix;
        var leadText = this.props.node.leadtext;
        var leadText = this.props.node.relatedurl;

        this.props.doc.set([this.props.node, 'prefix'], prefix);
        this.props.doc.set([this.props.node, 'leadtext'], leadText);
        this.props.doc.set([this.props.node, 'relatedurl'], relatedUrl);
    }

};

Component.extend(RelatedLinkComponent);
SurfaceTool.extend(RelatedLinkComponent);


RelatedLinkComponent.static.name = 'relatedlink';
RelatedLinkComponent.static.command = 'relatedlink';

module.exports = RelatedLinkComponent;