'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;

function RelatedLinkTool() {
    RelatedLinkTool.super.apply(this, arguments);
}

RelatedLinkTool.Prototype = function () {

    this.triggerInsert = function() {
        this.getCommand().insertRelatedLink("Lees ook", "", "");
        // removing breaks in order to show the plugin's placeholder
        // until Substance makes this substance/ui/annotatedTextComponent.js line:94
        // configurable. When adding a plugin and saving it blank, the br will be there
        // on render though.
        // TODO: fix this.
        jQuery(".sc-text-property").find('br').remove();
    };

    this.render = function () {
        var el = $$('button').addClass('se-tool').append(
            $$('i').addClass('fa fa-external-link-square')
        ).on('click', this.triggerInsert);
        return el;
    };
};

SurfaceTool.extend(RelatedLinkTool);

RelatedLinkTool.static.name = 'relatedlink';
RelatedLinkTool.static.command = 'relatedlink';

module.exports = RelatedLinkTool;
