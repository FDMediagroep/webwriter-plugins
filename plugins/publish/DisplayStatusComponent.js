'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var _ = require('lodash');

function DisplayStatusComponent() {
    DisplayStatusComponent.super.apply(this, arguments);
}

DisplayStatusComponent.Prototype = function() {

    this.calculateDateDifference = function(pubStart) {
        var now = moment();
        var timeDifference = now.diff(pubStart, 'seconds');
        if(timeDifference <  5400) {
            setTimeout(function() {
                this.rerender();
            }.bind(this), 60000);
        }
    };

    this.render = function() {

        var pubStartValue = '';
        if(this.props.currentAction.newsItemValues && this.props.currentAction.newsItemValues.pubStart) {
            var pubStartDate = moment(this.props.currentAction.newsItemValues.pubStart.value);

            this.calculateDateDifference(pubStartDate);

            moment.locale(this.context.i18n.t('moment-locale'));

            pubStartValue = moment(this.props.currentAction.newsItemValues.pubStart.value).fromNow();

        }
        var parsedStatus = _.replace(this.context.i18n.t(this.props.currentAction.statusText), '{{startDate}}', pubStartValue);

        return $$('span').addClass('description').append(parsedStatus).on('click', this.props.toggleMenu);
    };

};

Component.extend(DisplayStatusComponent);
module.exports = DisplayStatusComponent;
