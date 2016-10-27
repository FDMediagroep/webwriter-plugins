'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function DateTimeLocal() {
    DateTimeLocal.super.apply(this, arguments);
}

DateTimeLocal.Prototype = function () {

    this.getInitialState = function () {

    };

    this.render = function () {

        return $$('div').append([
            $$('label').addClass('form-control-label'),

            $$('input').attr({
                type: 'datetime-local',
                id: 'startDate',
                value: this.props.initialDate
            }).addClass('form-control').ref('date')
        ]);

    };
};
Component.extend(DateTimeLocal);
module.exports = DateTimeLocal;


