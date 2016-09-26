'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var EpicItem = require('./EpicItemComponent');
var NilUUID = require('writer/utils/NilUUID');

function EpicListComponent() {
    EpicListComponent.super.apply(this, arguments);

    this.name = 'epic';
}

EpicListComponent.Prototype = function () {

    this.getIdForRef = function(epic) {
        if(NilUUID.isNilUUID(epic.uuid)) {
            return 'epic-'+epic.title.replace(' ', ''); //TODO fix something to solve this reference
        } else if ( epic.uuid ) {
            return 'epic-'+epic.uuid;
        } else {
            console.warn('No UUID');
        }
    };

    this.render = function() {
        var existingEpics = this.props.existingEpics;
        var epicList = $$('ul').addClass('epics__list');

        existingEpics.forEach(function (epic) {
            // TODO: Watch this reference for memory leaks
            epicList.append($$(EpicItem, {epic: epic, removeEpic: this.deleteEpicAndReference.bind(this)}).ref(this.getIdForRef(epic)));
        }.bind(this));
        return epicList;
    };

    this.deleteEpicAndReference = function(epic) {
        delete this.refs[this.getIdForRef(epic)]; //Manual remove reference
        this.props.removeEpic(epic);
    };

};
Component.extend(EpicListComponent);
module.exports = EpicListComponent;
