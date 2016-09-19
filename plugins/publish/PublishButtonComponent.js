'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function PublishButtonComponent() {
    PublishButtonComponent.super.apply(this, arguments);
}

PublishButtonComponent.Prototype = function () {
    this.render = function () {

        var statusText = $$('span').addClass('status__text')
            .append(this.context.i18n.t(this.props.currentAction.actionText))
            .ref('currentStatusText');

        var smallScreenButton = $$(Icon, {icon: 'fa-check'}).addClass('status__icon').attr({title: this.props.currentAction.actionText});

        if (this.props.isSaving) {
            statusText.append($$('span').addClass('publish__saving').append($$(Icon, {icon: 'fa-spinner fa-spin'})));
            smallScreenButton = $$(Icon, {icon: 'fa-spinner fa-spin'}).addClass('status__icon');
        }

        var saveButton = $$('button')
            .addClass('btn btn-neutral')
            .attr('type', 'button')
            .append(statusText) // Append both text and button to toggle these on different screen resolutions
            .append(smallScreenButton).append(this.props.unsavedChangesSymbol).ref('saveButton');

        if (this.props.isSaving) {
            saveButton.addClass('disabled');
        }
        else {
            if (this.context.api.isSupportedBrowser()) {
                saveButton.on('click', this.save);
            }
            else {
                saveButton.addClass('disabled');
            }
        }

        var toggleButton = $$('button')
            .addClass('btn btn-neutral')
            .attr('type', 'button')
            .append($$(Icon, {icon: 'fa-ellipsis-h'}));

        if (this.context.api.isSupportedBrowser()) {
            toggleButton.on('click', this.props.toggleMenu);
        }
        else {
            toggleButton.addClass('disabled');
        }

        return $$('div')
            .addClass('btn-group')
            .append([
                saveButton,
                toggleButton
            ])
            .ref('btnGroup');
    };

    this.save = function () {
        this.props.saveClick();
    };
};

Component.extend(PublishButtonComponent);
module.exports = PublishButtonComponent;
