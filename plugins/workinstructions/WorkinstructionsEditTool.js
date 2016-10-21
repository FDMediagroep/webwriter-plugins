'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var idGen = require('writer/utils/IdGenerator');

function WorkinstructionsEditComponent() {
    Component.apply(this, arguments);
}

WorkinstructionsEditComponent.Prototype = function() {

    this.render = function() {

        var el = $$('div').addClass('embed-dialog');
        var workinstruction = $$('textarea')
            .addClass('textarea')
            .attr({'spellcheck' : false, 'placeholder' : this.context.i18n.t('Workinstruction placeholder') })
            .ref('workinstruction');
        if (this.props.text) {
            workinstruction.append(this.props.text);
        }
        el.append(workinstruction);
        return el;
    };

    this.didMount = function() {
        this.refs.workinstruction.focus();
    };

    this.saveWorkinstruction = function() {
        // check for other workinstructions
        this.deleteWorkinstruction();
        var text = this.refs.workinstruction.val().trim();
        if (text !== '') {
            this.context.api.setContentMetaObject('workinstructions', {
                 '@id': idGen(),
                 '@type': "fdmg/workinstructions",
                 '@name' : 'workinstructions',
                 data: {
                     text: text
                 }
            });
        }
        this.props.update(text);
    }

    this.deleteWorkinstruction = function () {
        var api = this.context.api;

        (api.getContentMetaObjectsByType('fdmg/workinstructions') || [])
            .forEach(function(workinstruction) {
                api.removeContentMetaObject('workinstructions', workinstruction['@id']);
        });
    };

    /**
     * Called when user clicks close or save
     * @param status
     * @returns {boolean} Return false if we want to prevent dialog close
     */
    this.onClose = function(status) {
        if (status === "cancel") {
            return;
        }
        else if (status === "save") {
            this.saveWorkinstruction();

            return true;
        }

    };
};

SurfaceTool.extend(WorkinstructionsEditComponent);

WorkinstructionsEditComponent.static.name = 'workinstructions';
// WorkinstructionsEditComponent.static.command = 'workinstructions';

module.exports = WorkinstructionsEditComponent;
