'use strict';

var ValidatableComponent = require('vendor/nl.fdmg/validatable/ValidatableComponent');
var $$ = ValidatableComponent.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var jQuery = require('substance/util/jquery');
var genUUID = require('writer/utils/IdGenerator');

var __ls_state = {
    'initialized?': false,
    'listmode?': false,
    'forcelistmode?': false,
    'enabled?': true,

    'pluginname': '',
    'plugintype': '',
    'labelprop': '@title',
    'heading': 'Heading',

    'emptyitem': { 'id': -1, 'label': '- geen selectie -'},
    'selection': { 'id': -1, 'label': '- geen selectie -'},
    'items': []
}

function LinkSelectorComponent() { ValidatableComponent.super.apply(this, arguments); }

LinkSelectorComponent.Prototype = function() {
    this.getInitialState = function() { return __ls_state; }

    this.updateSelection = function(newselection) {
        var name = this.getState().pluginname;
        var type = this.getState().plugintype;

        if (newselection.id !== -1) {
            this.updateLink(name, type, {
                '@rel': name,
                '@title': newselection.label,
                '@id': newselection.id,
                '@type': type,
                '@uuid': this.generateUUID()
            });

            this.extendState({ 'selection': newselection });

            console.info('assigned ' + name + ' "' + newselection.label + '" to document (id=' + newselection.id + ')');
        }
    }

    this.generateUUID = function() {    
    // @TODO: Why is this a function?
    // Why not call genUUID() directly?
        return genUUID()
    }

    this.knowsLabel = function(label) {
        return this.getState().items.some(function(item) { return item.label === label; });
    }

    this.getExistingLinkOrDefault = function(name, type, prop) {

        var links = this.context.api.getLinkByType(name, type);

        if (links.length == 0) {
            console.log('no initial ' + this.getState().pluginname);
            return this.getState().emptyitem;
        } else {
            var label = links.shift()[prop];

            console.log('initial ' + this.getState().pluginname + ' is ' + label);

            return { 'id': this.getItemIdByLabel(label), 'label': label };
        }
    }

    this.getItemIdByLabel = function(label) {
        var item = this.getState().items
            .filter(function(item) { return item.label === label; })
            .pop();
        return item ? item.id : -1;
    }

    this.getItemLabelById = function(id) {
        var item = this.getState().items
            .filter(function(item) { return item.id === id; })
            .pop();
        return item ? item.label : -1;
    }

    this.loadList = function(endpoint, mapper) {
        console.info('Loading items from "' + endpoint + '"');

        return jQuery.ajax(endpoint, {
            'data': {
                'dataType': 'json',
                'contentType': 'application/json; charset=utf-8'
            }
        })
        .done(function(items) { this.setItems(mapper(items)); }.bind(this))
        .fail(function(data, status, err) { console.error(err); })
    }

    this.setItems = function(items) {
        var state = this.getState();

        this.extendState({ 'items': items });

        var selection = this.getExistingLinkOrDefault(state.pluginname, state.plugintype, state.labelprop);

        this.extendState({
            'selection': selection,
            'listmode?': this.knowsLabel(selection.label) || state['forcelistmode?']
        });
    }

    this.sortByAplhabet = function(items, prop) {
        return items.sort(function(x, y) {
            x = x[prop].toUpperCase();
            y = y[prop].toUpperCase();

            if (x > y) return 1;
            else if (x < y) return -1;
            return 0;
        });
    }

    this.updateLink = function(name, type, newlink) {
        var api = this.context.api;

        // remove existing
        api.getLinkByType(name, type)
            .forEach(function(link) {
                api.removeLinkByUUIDAndRel(name, link['@uuid'], link['@rel']);
            });

        // add
        api.addLink(name, newlink);
    }

    this.render = function() {
        var state = this.getState();
        var listmode = state['listmode?']
        var forcelistmode = state['forcelistmode?'];

        var button = this.renderButton(
            listmode ? 'aangepast' : 'lijst',
            listmode ? 'fa-pencil' : 'fa-list-ul',
            function() { this.extendState({ 'listmode?': !listmode }); }.bind(this),
            forcelistmode);

        var body = (listmode || forcelistmode) ?
            this.renderList(state.items, state.selection, state['enabled?'], function(newselection) {
                this.updateSelection(newselection);
            }.bind(this))

            :

            this.renderFreeInput(state.selection, state['enabled?'], function(newselection) {
                if (newselection.id == 0) {
                    var matchingId = this.getItemIdByLabel(newselection.label);
                    if (matchingId !== -1) newselection.id = matchingId;
                }
                this.updateSelection(newselection);
            }.bind(this));

        return $$('div')
            .addClass('fdmg-sidebar')
            .append(
                $$('div')
                    .addClass('header')
                    .append($$('h2')
                        .append(state.heading),
                        button),
                body,
                $$('hr'));
    }

    this.renderButton = function(text, icon, callback, forcelistmode) {
        if (forcelistmode) {
            return $$('span');
        } else {
            return $$('button')
                .addClass('input-toggle')
                .append(text, $$(Icon, { 'icon': icon }))
                .on('click', callback);
        }
    }

    this.renderList = function(items, selection, enabled, onUpdate) {
        var listId = 'ls-list-' + this.generateUUID()
        var state = this.getState();

        var select = $$('select');
        if (!enabled) select.attr('disabled', 'disabled');

        return $$('div')
            .addClass('form-group')
            .append(
                select
                    .setId(listId)
                    .append('selection required')
                    .append(items.map(function(item) {
                        return $$('option')
                            .append(item.label)
                            .attr({
                                'data-id': item.id,
                                'selected': (selection.label === item.label)
                            })
                    }))
                    .on('change', function() {
                        var option = jQuery('#' + listId + ' option:selected');
                        onUpdate({ 'id': option.data('id'), 'label': option.val() });
                    }));
    }

    this.renderFreeInput = function(selection, enabled, onUpdate) {
        var freeTextId = 'ls-text' + this.generateUUID();

        var input = $$('input');
        if (!enabled) input.attr('disabled', 'disabled');

        return $$('div')
            .addClass('form-group')
            .append(
                input
                    .setId(freeTextId)
                    .addClass('form-control required')
                    .attr({
                        'value': (selection.label !== this.getState().emptyitem.label) ? selection.label : '',
                        'placeholder': 'Aangepaste invoer',
                        'type' : 'text'
                    })
                    .on('blur', function() {
                        var input = jQuery('#' + freeTextId);
                        onUpdate({ 'id': 0, 'label': input.val() });
                    }));
    }

    this.enableComponent = function() {
        this.extendState({ 'enabled?': true });
    }

    this.disableComponent = function() {
        this.extendState({ 'enabled?': false });
    }
}

ValidatableComponent.extend(LinkSelectorComponent);
LinkSelectorComponent.$$ = ValidatableComponent.$$;

module.exports = LinkSelectorComponent;
