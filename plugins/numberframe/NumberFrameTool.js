'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function NumberFrameTool() {
    NumberFrameTool.super.apply(this, arguments);
}

NumberFrameTool.Prototype = function () {

    this.triggerInsert = function() {
        this.getCommand().insertNumberFrame("", "");
        // removing breaks in order to show the plugin's placeholder
        // until Substance makes this substance/ui/annotatedTextComponent.js line:94
        // configurable. When adding a plugin and saving it blank, the br will be there
        // on render though.
        // TODO: fix this.
        jQuery(".sc-text-property").find('br').remove();
    };

    this.render = function () {
        var el = $$('button').addClass('se-tool').append(
            $$('i').addClass('fa fa-money')
        ).on('click', this.triggerInsert);
        return el;
    };
};

SurfaceTool.extend(NumberFrameTool);

NumberFrameTool.static.name = 'numberframe';
NumberFrameTool.static.command = 'numberframe';

module.exports = NumberFrameTool;
