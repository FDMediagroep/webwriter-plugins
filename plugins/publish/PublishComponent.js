'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

var DisplayStatus = require('./DisplayStatusComponent');
var PublishButton = require('./PublishButtonComponent');
var ActionItem = require('./ActionItemComponent');
var Config = require('./Config');
var $ = require('substance/util/jquery');


function PublishComponent() {
    PublishComponent.super.apply(this, arguments);

    this.api = this.context.api;
}

PublishComponent.Prototype = function () {

    this.toggleMenu = function () {
        $('#sc-publish__actions').slideToggle('fast', function () {
            if ($('#list').is(':visible')) {
                this.extendState({optionsVisible: true});
            } else {
                this.extendState({optionsVisible: false});
            }
        }.bind(this));
    };

    this.getInitialState = function () {
        this.name = 'publish';
        this.config = new Config();
        this.applyMetadataFromApi();

        var currentAction = this.getCurrentAction();
        this.action = currentAction;
        var availableActions = this.getAvailableActionsForAction(currentAction);

        this.previousAction = currentAction;

        return {
            currentAction: currentAction,
            availableActions: availableActions,
            pubStart: this.pubStart,
            isSaving: false,
            optionsVisible: false
        };
    };


    /**
     * Loads pubStatus, pubStart and pubStop form the API and sets it on internal vars
     */
    this.applyMetadataFromApi = function () {
        this.pubStatus = this.context.api.getPubStatus();
        this.pubStart = this.context.api.getPubStart();
        this.pubStop = this.context.api.getPubStop();
    };


    /**
     * Get the current action
     */
    this.getCurrentAction = function () {
        // If no pubStatus is found, assume the article is published
        // Call changeStatus in the render method
        if (this.pubStatus === null) {
            return this.config.getAction('publish');
        } else {
            return this.config.getActionFromStatus(this.pubStatus.qcode);
        }
    };


    /**
     * Creates a new object called newsItemValues on the action object.
     * This is populated with information from the API such as pubStart and pubStop
     */
    this.applyMetaDataOnCurrentAction = function () {
        this.applyMetadataFromApi();
        var action = this.getCurrentAction();
        Object.keys(action.newsItemProperties).forEach(function (key) {
            if (this[key]) {
                action.newsItemValues[key] = this[key];
            }
        }.bind(this));
    };


    /**
     * Get all the available actions for the current action
     * @param {object} currentAction The current action object
     * @returns {Array} availableActions
     */
    this.getAvailableActionsForAction = function (currentAction) {
        var availableActions = [];
        currentAction.availableActions.forEach(function (action) {
            availableActions.push(this.config.getAction(action));
        }.bind(this));
        return availableActions;
    };


    /**
     * Did mount
     * Register eventlisteners
     */
    this.didMount = function () {
        if (!this.context.api.isSupportedBrowser()) {
            this.context.api.showMessageDialog([
                {
                    plugin: 'publish',
                    type: 'error',
                    message: this.i18n.t(
                        'Please note that your browser is not supported. Saving has been disabled.')
                }
            ]);
        }

        this.context.api.on(this.name, 'document:saved', function () {
            this.previousAction = this.action;

            var availableActions = this.getAvailableActionsForAction(this.action);
            this.setState({
                currentAction: this.action,
                availableActions: availableActions,
                optionsVisible: false,
                isSaving: false,
                unsavedChangesSymbol: ''
            });

            this.refs.displayStatus.addClass('imc-flash');
            if (true !== this.cancelNotification) {
                this.context.api.ui.showNotification(
                    'publish',
                    null,
                    this.i18n.t(this.previousAction.actionMessage)
                );
                this.cancelNotification = false;
            }

        }.bind(this));


        /**
         * When saving has failed
         * Reset pubStatus to previous status
         */
        this.context.api.on(this.name, 'document:savefailed', function (data) {
            this.resetStatus();
        }.bind(this));

        this.context.api.on('publish-button', 'document:isunsaved', function (data) {
            // Data contains event info about the origin of this event
            if (!data.data || data.data && data.data.name !== this.name) {
                this.extendState({
                    unsavedChangesSymbol: "*"
                });
            }

        }.bind(this));


        /**
         * When document is start saving change saving state
         */
        this.context.api.on('publish-button', 'document:startsaving', function () {
            this.extendState({
                isSaving: true
            });
        }.bind(this));
    };

    this.resetStatus = function () {
        var availableActions = this.getAvailableActionsForAction(this.previousAction);
//        this.updatePubStatus(this.previousAction);

        this.setState({
            currentAction: this.previousAction,
            availableActions: availableActions,
            optionsVisible: true,
            isSaving: false,
            unsavedChangesSymbol: "*"
        });

        resetStatusToPreviousState.call(this);

        this.extendState({
            isSaving: false
        });

        this.action = this.previousAction;
    };

    this.render = function () {
        this.applyMetaDataOnCurrentAction();

        // Hack - The original check is made in getInitialResult but it was to soon to update the pubStatus
        if (this.pubStatus === null) {
            this.changeStatus(this.config.getAction('publish'));
        }

        var el = $$('div').addClass('sc-publish');
        var menu = $$('div').addClass('sc-publish__menu').ref('publishMenu');

        var status = $$('div').addClass('sc-publish__status')
            .append(
                $$(PublishButton, {
                    currentAction: this.state.currentAction,
                    saveClick: this.saveClick.bind(this),
                    toggleMenu: this.toggleMenu.bind(this),
                    isSaving: this.state.isSaving,
                    unsavedChangesSymbol: this.state.unsavedChangesSymbol
                }).ref('publishButton')
            )
            .append($$(DisplayStatus, {
                currentAction: this.state.currentAction,
                toggleMenu: this.toggleMenu.bind(this)
            }).ref('displayStatus')).ref('statusBar');

        menu.append(status);
        el.append(menu);

        var publishActions = $$('div')
            .attr('id', 'sc-publish__actions')
            .attr('style', this.state.optionsVisible ? '' : 'display: none');

        publishActions.append(
            $$(ActionItem, {
                currentAction: this.state.currentAction,
                availableActions: this.state.availableActions,
                status: this.action,
                isSaving: this.state.isSaving,
                changePublishStatus: this.changeStatus.bind(this)
            }).ref('actionItemList')
        );

        el.append(publishActions);
        return el;
    };


    /**
     * Remove events listener when component is disposed
     */
    this.dispose = function () {
        this.context.api.off(this.name, 'document:saved');
    };


    /**
     * Handy method when removing dates for publishing
     */
    this.removePublishDates = function () {
        this.context.api.removePubStart(this.name);
        this.context.api.removePubStop(this.name);
    };


    this.removeNewsItemsDateValuesForAction = function (action) {
        delete action.newsItemValues.pubStart;
        delete action.newsItemValues.pubStop;
    };

    /**
     * Save current values for pubstatus, pubstart and pubstop before saving.
     * If validation fails the saved values will be restored
     */
    this.setPublishValuesPreSave = function() {
        this.pubStatusPreSave = this.context.api.getPubStatus();
        this.pubStartPreSave = this.context.api.getPubStart();
        this.pubStopPreSave = this.context.api.getPubStop();
    };

    this.changeStatus = function (action, save) {
        this.action = action;

        var pubStart;

        this.setPublishValuesPreSave(); // Save values if validation failes

        // All actions must have a pubStatus qcode
        if (!this.action.newsItemProperties.qcode) {
            console.error('Choosen status has no qcode registered');
        }
        this.updatePubStatus(this.action);

        switch (action.id) {
            case 'draft':
                this.removePublishDates();
                this.removeNewsItemsDateValuesForAction(action);
                break;
            case 'cancel':
                this.removePublishDates();
                this.removeNewsItemsDateValuesForAction(action);
                break;
            case 'done':
                this.removePublishDates();
                this.removeNewsItemsDateValuesForAction(action);
                break;
            case 'publish':
                this.setPublishValues(action);
                break;
            case 'republish':
                pubStart = {value: moment().format('YYYY-MM-DDTHH:mm:ssZ')};
                this.context.api.setPubStart(this.name, pubStart);
                break;
            case 'schedule':
                this.context.api.setPubStart(this.name, action.newsItemValues.pubStart);
                if (action.newsItemValues.pubStop) {
                    this.context.api.setPubStop(this.name, action.newsItemValues.pubStop);
                } else {
                    this.context.api.removePubStop(this.name);
                }
                break;
            default:
                break;
        }

        if (save === false) {
            this.context.api.onDocumentSaved();
            return;
        }

        this.extendState({
            isSaving: true
        });

        this.context.api.save(null, this.resetStatus.bind(this));
    };


    this.setPublishValues = function (action) {
        if (action.newsItemValues.overridePubStop) {
            var pubStop = action.newsItemValues.pubStop;
            if (pubStop) {
                this.context.api.setPubStop(this.name, pubStop);
            } else {
                this.context.api.removePubStop(this.name);
            }
        } else {
            var pubStart = {value: moment().format('YYYY-MM-DDTHH:mm:ssZ')};
            this.api.setPubStart(this.name, pubStart);
        }
        action.newsItemValues = {};
    };

    /**
     * Update pubStatus
     * @param status
     */
    this.updatePubStatus = function (status) {
        this.context.api.setPubstatus(this.name, {qcode: status.newsItemProperties.qcode});
    };

    /**
     * Handles the click on the actual save button.
     */
    this.saveClick = function () {
        this.setPublishValuesPreSave();
        this.context.api.save(
            this.onBeforeSave.bind(this),
            this.onError.bind(this)
        );
    };

    this.onBeforeSave = function () {
        this.extendState({
            isSaving: true
        });


        var action = this.state.currentAction;
        if (action.actionNext) {
            action = this.config.getAction(action.actionNext);
        }
    };

    this.onError = function () {
        resetStatusToPreviousState.call(this);
    };

    function resetStatusToPreviousState() {
        if (this.pubStartPreSave) {
            this.context.api.setPubStart(this.name, this.pubStartPreSave);
        } else {
            this.context.api.removePubStart();
        }

        if (this.pubStopPreSav) {
            this.context.api.setPubStop(this.name, this.pubStopPreSave);
        } else {
            this.context.api.removePubStop();
        }

        if (this.pubStatusPreSave) {
            this.context.api.setPubstatus(this.name, this.pubStatusPreSave);
        }
    }

};

Component.extend(PublishComponent);
module.exports = PublishComponent;
