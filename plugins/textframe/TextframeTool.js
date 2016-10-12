'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;
var $ = require('substance/util/jquery');

function TextframeTool() {
    TextframeTool.super.apply(this, arguments);
}

TextframeTool.Prototype = function () {

    this.render = function () {
        var el = $$('div');

        el.append(
            $$('button').addClass('se-tool').append(
                $$('i').addClass('fa fa-tree')
            )
            .on('click', this.triggerInsert.bind(this))
        );

        return el;
    };

    this.triggerInsert = function() {
        this.getCommand().insertTextframe([]);
    };
};

SurfaceTool.extend(TextframeTool);

TextframeTool.static.name = 'textframe';
TextframeTool.static.command = 'textframe';

module.exports = TextframeTool;
