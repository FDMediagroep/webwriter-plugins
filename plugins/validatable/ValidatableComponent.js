'use strict';

var Component = require('substance/ui/Component');

function ValidatableComponent() {
    ValidatableComponent.super.apply(this, arguments);
}

ValidatableComponent.Prototype = function() {
    this.validateAndReturnMessages = function() {
        return [];
    }
}

Component.extend(ValidatableComponent);

ValidatableComponent.$$ = Component.$$;

module.exports = ValidatableComponent;
