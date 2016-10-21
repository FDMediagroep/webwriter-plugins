'use strict';

var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function WorkinstructionsComponent() {
    Component.apply(this, arguments);
}

WorkinstructionsComponent.Prototype = function() {

    this.getInitialState = function () {

        var workInstruction = this.context.api.getContentMetaObjectsByType('fdmg/workinstructions');

        if (!workInstruction) {
            return { workInstruction : ''}
        } else {
            return { workInstruction: workInstruction.map(function(workinstruction){
                        return workinstruction.data.text;
                    }).pop() }
        }
        
    };

    this.render = function() {

         var workinstructionsArea = $$('div').addClass('workinstructions-wrapper').append(
            $$('textarea')
            .addClass('workinstructions-textarea')
            .attr({'spellcheck' : false, 'disabled' : 'disabled', 'placeholder' : this.context.i18n.t('Workinstruction placeholder') })
            .setValue(this.state.workInstruction)
            .ref('workinstructions')).on('click', this.editWorkinstruction);

        return $$('div').addClass('fdmg-sidebar')
                        .append($$('h2').append( this.context.i18n.t('Workinstructions')))
                        .append(workinstructionsArea, $$('hr'));
    };

    this.editWorkinstruction = function() {
        this.context.api.showDialog(
            require('./WorkinstructionsEditTool'),
            {
                text: this.state.workInstruction,
                 update: function(text) {
                    this.extendState({ workInstruction : text })
                }.bind(this)                
            },
            {
                title: this.context.i18n.t('Workinstructions'),
                // TODO: Make center true work (check docs search for dialog)
                center: true
            }
        );

    };

};

Component.extend(WorkinstructionsComponent);

module.exports = WorkinstructionsComponent;
