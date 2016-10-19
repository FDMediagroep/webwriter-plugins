'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function WorkinstructionsTool() {
    WorkinstructionsTool.super.apply(this, arguments);
}

WorkinstructionsTool.Prototype = function () {

    this.insertWorkinstructions = function () {
        this.context.api.showDialog(
            require('./WorkinstructionsEditTool'),
            {
                myProps: 'Insert HTML'
            },
            {
                title: "Embed HTML"
            }
        );
    };

    this.render = function () {
        var el = $$('button').addClass('se-tool').append(
            $$('i').addClass('fa fa-code')
        ).on('click', this.insertWorkinstructions);
        return el;
    };
};

SurfaceTool.extend(WorkinstructionsTool);

WorkinstructionsTool.static.name = 'workinstructions';
WorkinstructionsTool.static.command = 'workinstructions';

module.exports = WorkinstructionsTool;
