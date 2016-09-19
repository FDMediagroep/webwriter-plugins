'use strict';

function Config() {}


Config.prototype.getActionFromStatus = function(pubStatus) {

    if('imext:draft' === pubStatus) {
        return this.actions.draft;
    } else if('imext:done' === pubStatus) {
        return this.actions.done;
    } else if('stat:withheld' === pubStatus) {
        return this.actions.schedule;
    } else if('stat:usable' === pubStatus) {
        return this.actions.publish;
    } else if('stat:canceled' === pubStatus) {
        return this.actions.draft;
    }

};

Config.prototype.getAction = function(action) {
    return this.actions[action];
};

Config.prototype.actions = {

    'draft': {
        id: 'draft',
        name: 'Draft',
        icon: 'fa-pencil',
        statusText: 'Draft',
        actionMethod: 'save',
        actionText: 'Save',
        actionMessage: 'The article has been saved',
        availableActions: [
            'done',
            'publish',
            'schedule'
        ],
        newsItemProperties: {
            qcode: 'imext:draft'
        },
        newsItemValues: {}
    },
    'done': {
        id: 'done',
        name: 'Ready for approval',
        icon: 'fa-check-circle-o',
        statusText: 'Ready for approval',
        actionMessage: 'The article is ready for approval',
        actionMethod: 'save',
        actionText: 'Save',
        availableActions: [
            'publish',
            'schedule',
            'draft'
        ],
        newsItemProperties: {
            qcode: 'imext:done'
        },
        newsItemValues: {}
    },
    'update': {
        id: 'update',
        name: 'Update',
        icon: 'fa-send',
        statusText: 'Update',
        actionMessage: 'The article has been saved',
        actionMethod: 'update',
        availableActions: [
            'update',
            'republish',
            'cancel'
        ],
        newsItemProperties: {
        },
        newsItemValues: {}
    },
    'publish': {
        id: 'publish',
        name: 'Publish',
        icon: 'fa-send',
        statusText: 'Published {{startDate}}',
        actionText: 'Update',
        actionMessage: 'The article has been published',
        actionMethod: 'publish',
        actionNext: 'update',
        availableActions: [
            'publish',
            'republish',
            'cancel'
        ],
        newsItemProperties: {
            qcode: 'stat:usable',
            pubStart: 'now',
            pubStop: 'userdefined'
        },
        newsItemValues: {}
    },
    'schedule': {
        id: 'schedule',
        name: 'Schedule for publish',
        icon: 'fa-clock-o',
        statusText: 'Publish {{startDate}}',
        actionText: 'Update',
        actionMessage: 'The article has been scheduled for publication',
        actionMethod: 'schedule',
        actionNext: 'update',
        availableActions: [
            'publish',
            'schedule',
            'cancel'
        ],
        newsItemProperties: {
            qcode: 'stat:withheld',
            pubStart: 'userdefined',
            pubStop: 'userdefined'
        },
        newsItemValues: {}
    },
    republish: {
        id: 'republish',
        name: 'Republish',
        icon: 'fa-retweet',
        statusText: 'Republished {{startDate}}',
        actionText: 'Update',
        actionMessage: 'The article has been republished',
        actionNext: 'update',
        availableActions: [
            'republish',
            'cancel'
        ],
        newsItemProperties: {
            qcode: 'stat:usable',
            pubStart: 'now'
        },
        newsItemValues: {}
    },
    'cancel': {
        id: 'draft',
        name: 'Draft',
        icon: 'fa-pencil',
        statusText: 'Draft',
        actionText: 'Save',
        actionMessage: 'The article has been saved and unpublished',
        actionMethod: 'save',
        availableActions: [
            'done',
            'publish',
            'schedule'
        ],
        newsItemProperties: {
            qcode: 'imext:draft'
        },
        newsItemValues: {}

    }

};


module.exports = Config;
