'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function StackFrameComponent() {
    Component.apply(this, arguments);
}

StackFrameComponent.Prototype = function() {

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
                    }).addClass('heading').attr({'contentEditable' : true, "data-text" : "Titel"}).ref('heading');

        var el = $$('a').append([
                    $$('div').addClass('header').append([
                        $$(Icon, {icon: 'fa-bars'}).addClass('plugin-icon'),
                        $$('div').addClass('plugin-title').append("Stapelkader"),
                        $$('span').addClass('remove-button').append(
                            $$(Icon, {icon: 'fa-remove'})
                        ).on('click', this.removeStackFrame)
                        .attr('title', this.context.i18n.t('Verwijderen uit artikel'))
                    ]),
                    heading,
                    content
                ]).addClass('fdmg-stackframe fdmg-box').attr('contentEditable', false);

        this.context.api.handleDrag(
            el,
            this.props.node
        );

        this.context.api.on('publish-button', 'document:startsaving', function () {
           this.updateStackFrame();
        }.bind(this));

        return el;
    };

    this.updateStackFrame = function () {
        if (typeof(this.props.node.content) !== 'undefined' && typeof(this.props.node.heading)!== 'undefined') {
            this.updateProps(
               this.refs.content.text(), this.refs.heading.text()  
            );
            
        }
    }

    this.removeStackFrame = function() {
        this.context.api.deleteNode('stackframe', this.props.node);
    };

    this.updateProps = function (content, heading) {
        var content = this.props.node.content;
        var heading = this.props.node.heading;

        this.props.doc.set([this.props.node, 'content'], content);
        this.props.doc.set([this.props.node, 'heading'], heading);
    }

};

Component.extend(StackFrameComponent);
SurfaceTool.extend(StackFrameComponent);


StackFrameComponent.static.name = 'stackframe';
StackFrameComponent.static.command = 'stackframe';

module.exports = StackFrameComponent;