'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var DateTimeLocal = require('./DateTimeLocalComponent');


function ActionItemComponent() {
    ActionItemComponent.super.apply(this, arguments);
}

ActionItemComponent.Prototype = function () {

    this.getInitialState = function () {
        return {
            isScheduling: false
        };
    };

    this.getToggleScheduleOptionsButton = function (open) {
        var icon = open ? 'fa-caret-up' : 'fa-caret-down';
        return $$('button').addClass('togglebutton').append($$(Icon, {icon: icon})).on('click', this.toggleScheduleOptions);
    };

    this.render = function () {

        var list = $$('ul')
            .attr('id', 'list');

        this.props.availableActions.forEach(function (action) {

            var listItem = $$('li');
            var itemIcon = this.props.isSaving && action.name === this.props.status.name ? 'fa-spinner fa-spin' : action.icon;
            var itemClass = this.props.isSaving && action.name !== this.props.status.name ? 'disabled' : '';

            var initialStartDate,
                subList,
                saveButton;

            if (action.newsItemValues && action.newsItemValues.pubStart) {
                initialStartDate = moment(action.newsItemValues.pubStart.value).format('YYYY-MM-DDTHH:mm');
            }

            if (action.actionMethod === 'schedule') {

                listItem.append($$(Icon, {icon: action.icon}));
                listItem.addClass(itemClass);

                subList = $$('ul').addClass('sc-publish__submenu').addClass('clearfix');
                if (!this.state.isScheduling) {
                    subList.attr('style', 'display:none');
                    listItem.append(this.getToggleScheduleOptionsButton(false));
                } else {
                    listItem.append(this.getToggleScheduleOptionsButton(true));
                }

                listItem.append($$('a').append(this.context.i18n.t(action.name)).on('click', this.toggleScheduleOptions));

                var subListItemStartDate = $$('li')
                    .append($$(DateTimeLocal, {
                        title: 'Start',
                        initialDate: initialStartDate,
                        validateDate: this.validateStartDate.bind(this)
                    }).ref('startDateComponent'));

                saveButton = $$('li').append(
                    $$('button')
                        .addClass('btn btn-secondary pull-right clearfix')
                        .append(this.context.i18n.t('Save'))
                        .on('click', function () {
                            if (this.validateStartDate()) {
                                action.newsItemValues.pubStart = {
                                    value: moment(this.refs.startDateComponent.refs.date.val()).format('YYYY-MM-DDTHH:mm:ssZ')
                                };
                                action.newsItemValues.pubStop = null;
                                this.setState({isScheduling: true});
                                this.props.changePublishStatus(action);
                            }
                        }.bind(this)));

                subList.append(subListItemStartDate);
                subList.append(saveButton);
                listItem.append(subList);

            } else if (action.actionMethod === 'publish' && this.props.currentAction.id === 'publish') {

                listItem.append($$(Icon, {icon: itemIcon}));
                listItem.addClass(itemClass);

                subList = $$('ul').addClass('sc-publish__submenu').addClass('clearfix').attr('style', 'display:none');
                if (!this.state.isScheduling) {
                    subList.attr('style', 'display:none');
                    listItem.append(this.getToggleScheduleOptionsButton(false));
                } else {
                    subList.attr('style', 'display:block');
                    listItem.append(this.getToggleScheduleOptionsButton(true));
                }

                listItem.append($$('a').append(this.context.i18n.t('Published') + " " + moment(initialStartDate).format('D MMM -YY - HH:mm')).on('click', this.toggleScheduleOptions));


                saveButton = $$('li').append(
                    $$('button')
                        .addClass('btn btn-secondary pull-right clearfix')
                        .append(this.context.i18n.t('Save'))
                        .on('click', function () {
                            action.newsItemValues.overridePubStop = true;
                            this.props.changePublishStatus(action);
                        }.bind(this)));


                subList.append(subListItemPubStopDate);
                subList.append(saveButton);
                listItem.append(subList);

            } else {
                listItem.append($$(Icon, {icon: itemIcon}));
                listItem.addClass(itemClass);

                listItem.on('click', function () {
                    this.props.changePublishStatus(action);
                }.bind(this));
                listItem.append($$('a').append(this.context.i18n.t(action.name)));
            }

            list.append(listItem).ref('actionItem-' + action.name);
        }.bind(this));

        return list;
    };

    this.toggleScheduleOptions = function () {
        $('.sc-publish__submenu').slideToggle('fast', function () {
            if (this.state.isScheduling) {
                this.setState({isScheduling: false});
            } else {
                this.setState({isScheduling: true});
            }

        }.bind(this));

    };

    this.validateStartDate = function () {
        var startDateElement = this.refs.startDateComponent.refs.date;
        var startDate = moment(startDateElement.val());

        if (!startDate.isValid()) {
            this._addFailClass(startDateElement);
            return false;
        } else {
            this._removeFailClass(startDateElement);
            this._addSuccessClass(startDateElement);
        }
        return true;
    };

    this._addFailClass = function (element) {
        element.parent.addClass('has-danger');
        element.addClass('form-control-danger');
    };
    this._removeFailClass = function (element) {
        element.parent.removeClass('has-danger');
        element.removeClass('form-control-danger');
    };
    this._addSuccessClass = function (element) {
        element.parent.addClass('has-success');
        element.addClass('form-control-success');
    };


};

Component.extend(ActionItemComponent);
module.exports = ActionItemComponent;
