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
        var workInstruction = this.context.api.getContentMetaObjectsByType('fdmg/workinstructions')
                .map(function(workinstruction){
                    return workinstruction.data.text;
                }).pop() || '';

        return {
            workInstruction: workInstruction
        };
    };

    this.render = function() {

         var workinstructionsArea = $$('textarea')
            .addClass('textarea')
            .attr('spellcheck', false)
            .setValue(this.state.workInstruction)
            .ref('workinstructions') .on('click', this.editWorkinstruction);

        return $$('div')
            .addClass('fdmg-sidebar')
            .append(
                $$('div')
                    .addClass('header')
                    .append($$('h2')
                        .append( this.context.i18n.t('Workinstructions')),
                workinstructionsArea),
                $$('hr'));
    };

    // Passing the state each time we open the edit tool
    this.editWorkinstruction = function() {
        console.log( this.state.workInstruction, 'edit');
        this.context.api.showDialog(
            require('./WorkinstructionsEditTool'),
            {
                text: this.state.workInstruction,
                 update: function(text) {
                    this.extendState({ workInstruction : text })
                }.bind(this)
            },
            {
                title: this.context.i18n.t('Workinstructions')
            }
        );

    };

};

Component.extend(WorkinstructionsComponent);

module.exports = WorkinstructionsComponent;
