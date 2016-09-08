'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function NumberFrameComponent() {
    Component.apply(this, arguments);
}

NumberFrameComponent.Prototype = function() {

    this.render = function() {

        var content = $$(TextProperty, {
                        tagName: 'div',
                        name: 'content',
                        path: [this.props.node.id, 'content']
                    }).addClass('content').attr({'contentEditable' : true, "data-text" : "Tekst"}).ref('content');

        var heading =  $$(TextProperty, {
                        tagName: 'div',
                        name: 'heading',
                        path: [this.props.node.id, 'heading']
                    }).addClass('heading').attr({'contentEditable' : true, "data-text" : "Aantal"}).ref('heading');

        var el = $$('a').append([
                    $$('div').addClass('header').append([
                        $$(Icon, {icon: 'fa-money'}).addClass('plugin-icon'),
                        $$('div').addClass('plugin-title').append("Cijferkader"),
                        $$('span').addClass('remove-button').append(
                            $$(Icon, {icon: 'fa-remove'})
                        ).on('click', this.removeNumberFrame)
                        .attr('title', this.context.i18n.t('Verwijderen uit artikel'))
                    ]),
                    heading,
                    content  
                ]).addClass('fdmg-numberframe fdmg-box').attr('contentEditable', false);

        this.context.api.handleDrag(
            el,
            this.props.node
        );

        this.context.api.on('publish-button', 'document:startsaving', function () {
           this.updateNumberFrame();
        }.bind(this));

        return el;
    };

    this.updateNumberFrame = function () {
        if (typeof(this.props.node.content) !== 'undefined' && typeof(this.props.node.heading)!== 'undefined') {
            this.updateProps(
               this.refs.content.text(), this.refs.heading.text()  
            );
            
        }
    }

    this.removeNumberFrame = function() {
        this.context.api.deleteNode('numberframe', this.props.node);
    };

    this.updateProps = function (content, heading) {
        var content = this.props.node.content;
        var heading = this.props.node.heading;

        this.props.doc.set([this.props.node, 'content'], content);
        this.props.doc.set([this.props.node, 'heading'], heading);
    }

};

Component.extend(NumberFrameComponent);
SurfaceTool.extend(NumberFrameComponent);


NumberFrameComponent.static.name = 'numberframe';
NumberFrameComponent.static.command = 'numberframe';

module.exports = NumberFrameComponent;