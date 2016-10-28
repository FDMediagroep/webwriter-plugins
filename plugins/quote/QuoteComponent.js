'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function QuoteComponent() {
    Component.apply(this, arguments);
}

QuoteComponent.Prototype = function() {

    this.render = function(callback) {

        var message = $$(TextProperty, {
                        tagName: 'div',
                        name: 'message',
                        path: [this.props.node.id, 'message']
                    }).addClass('content').attr({'contentEditable' : true, "data-text" : this.context.i18n.t("Quote")}).ref('message');

        var author =  $$(TextProperty, {
                        tagName: 'div',
                        name: 'author',
                        path: [this.props.node.id, 'author']
                    }).addClass('heading').attr({'contentEditable' : true, "data-text" : this.context.i18n.t("Source")}).ref('author');

        var el = $$('a').append([
                    $$('div').addClass('header').append([
                        $$(Icon, {icon: 'fa-code'}).addClass('plugin-icon'),
                        $$('div').addClass('plugin-title').append(this.context.i18n.t("Quote")),
                        $$('span').addClass('remove-button').append(
                            $$(Icon, {icon: 'fa-remove'})
                        ).on('click', this.removeQuote)
                        .attr('title', this.context.i18n.t('Verwijderen uit artikel'))
                    ]),
                    message, 
                    author
                ]).addClass('fdmg-quote fdmg-box').attr('contentEditable', false);

        this.context.api.handleDrag(
            el,
            this.props.node
        );

        this.context.api.on('publish-button', 'document:startsaving', function () {
           this.updateQuote();
        }.bind(this));

        return el;
    };

    this.updateQuote = function () {
        if (typeof(this.props.node.message) !== 'undefined' && typeof(this.props.node.author)!== 'undefined') {
            this.updateProps(
               this.refs.message.text(), this.refs.author.text()  
            ); 
        }
    }

    this.removeQuote = function() {
        this.context.api.deleteNode('quote', this.props.node);
    };

    this.updateProps = function (message, author) {
        var message = this.props.node.message;
        var author = this.props.node.author;

        this.props.doc.set([this.props.node, 'message'], message);
        this.props.doc.set([this.props.node, 'author'], author);
    }

};

Component.extend(QuoteComponent);
SurfaceTool.extend(QuoteComponent);


QuoteComponent.static.name = 'quote';
QuoteComponent.static.command = 'quote';

module.exports = QuoteComponent;