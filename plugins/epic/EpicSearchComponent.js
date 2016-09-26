'use strict';

var Component = require('substance/ui/Component');
var SpinnerComponent = require('writer/components/form-search/SpinnerComponent');
var $$ = Component.$$;
var _ = require('lodash');

function FormSearchComponent() {
    FormSearchComponent.super.apply(this, arguments);

    if (this.props.createAllowed && !this.props.onCreate) {
        console.warn("Creation of items is allowed but onCreate method is missing");
    }
}

/**
 * Props to pass:
 * SearchUrl {string}
 * onSelect {function}
 * onCreate {function} If allowing to create new items - pass this function
 * existingItems {array}
 * placeholderText {string} Placehold text inside input
 * createAllowed {bool} If creation of new elements is allowed
 *
 * When selecting this.props.onSelect
 * @constructor
 */

FormSearchComponent.Prototype = function () {

    this.next = function () {
        var searchResultElement = this.refs.searchResult.el,
            selectedItem = $('#item-' + this.currentSelectedItem.id),
            items = this.state.items;

        if (this.state.currentSelectedIndex >= 0) {
            var idx = parseInt(this.state.currentSelectedIndex);
            idx++;
            searchResultElement.scrollTop = selectedItem.offsetTop;
            this.extendState({
                currentSelectedIndex: idx
            });

            if (idx === items.length) {
                this.extendState({
                    currentSelectedIndex: 0
                });
                searchResultElement.scrollTop = 0;
            }
        }
    };

    this.prev = function () {

        var searchResultElement = this.refs.searchResult.el,
            selectedItemPrevSibling = $(
                '#item-' + this.currentSelectedItem.id).previousSibling;

        var items = this.state.items;
        if (this.state.currentSelectedIndex >= 0) {
            var idx = parseInt(this.state.currentSelectedIndex);

            if (selectedItemPrevSibling === null) {
                searchResultElement.scrollTop = searchResultElement.lastChild.offsetTop;
                this.extendState({
                    currentSelectedIndex: items.length - 1
                });

            } else {
                searchResultElement.scrollTop = selectedItemPrevSibling.offsetTop - selectedItemPrevSibling.offsetHeight;
                idx--;
                this.extendState({
                    currentSelectedIndex: idx
                });
            }
        }
    };

    this.search = function (e) {
        switch (e.keyCode) {

            case 38: // up arrow
                if (e.shiftKey) return;
                e.preventDefault();
                this.prev();
                break;

            case 40: // down arrow
                if (e.shiftKey) return;
                e.preventDefault();
                this.next();
                break;

            case 9: // tab
            case 13: // enter
                e.preventDefault();
                if (this.state.items.length === 0) return;
                this.select();
                break;

            case 27: // escape
                this.hide();
                break;
            default:
                this.lookup();
        }

        //e.preventDefault();


    };

    this.hide = function () {
        this.refs.searchInput.val("");
        this.extendState({
            items: [],
            isSearching: false,
            currentSelectedIndex: 0
        });

    };

    this.select = function () {
        this.doAction(this.currentSelectedItem);
    };

    this.lookup = function () {
        var input = this.refs.searchInput.val();
        this.extendState({
            isSearching: true
        });

        if (input.length === 0) {
            this.extendState({
                items: [],
                isSearching: false,
                currentSelectedIndex: 0
            });
            return;
        }

        // Might pass a boolean from parent to search with wildcard?
        var wildcardSearch = true;
        if (wildcardSearch) {
            input += '*';
        }


        $.getJSON(this.props.searchUrl + input, {
            method: "GET",
            contentType: 'application/json',
            dataType: 'application/json'
        }).done(function (data) {
            this.extendState({
                items: this.getItemsThatNotExisting(data),
                isSearching: false
            });
        }.bind(this)).error(function (err, xhr, text) {
            console.log("text", text);
        });

    };

    this.getInitialState = function () {
        return {
            items: [],
            currentSelectedIndex: 0
        };
    };

    /**
     * Adds a dummy element to items list which contains a "create item" element
     * @returns {{title: string[], id: string, shortDescription: string[]}}
     */
    this.getCreateNewItem = function () {
        return {
            title: [this.context.i18n.t("Create") + ": " + this.refs.searchInput.val()],
            value: this.refs.searchInput.val(),
            id: "__create-new",
            imType: ["x-im/template"],
            shortDescription: [
                this.context.i18n.t("Create new") + ": " + this.refs.searchInput.val()
            ]
        };
    };

    this.getItemsThatNotExisting = function (data) {
        var existingItems = this.props.existingItems;

        if (this.props.onCreate && this.props.createAllowed) {
            data.push(this.getCreateNewItem());
        }

        var existingItemsMap = {};
        if (existingItems) {
            existingItems.forEach(function (item) {
                existingItemsMap[item.id] = item.id;
            });
        }

        data.forEach(function (item) {
            if (existingItemsMap[item.id]) {
                item.exists = true;
            }
        });

        return data;

        // return _.differenceWith(data, existingItems, function (a, b) {
        //     return a.id === b.id;
        // });
    };


    function itemAlreadyExists(items, item) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id !== '__create-new' && items[i].title.toLowerCase() === item.value.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    this.doAction = function (item) {
        if (item.exists) {
            return;
        }
        if (this.props.onCreate && this.props.createAllowed && item.id === '__create-new') {
            this.props.onCreate(item, itemAlreadyExists(this.state.items, item));
        } else {
            this.props.onSelect(item);
        }

        this.hide();
    };

    this.render = function () {

        var formGroup = $$('div').addClass('form-group').ref('formGroup');

        var searchInput = $$('input')
            .addClass('form-control')
            .addClass('form__search')
            .on('keyup', this.search)
            .attr('autocomplete', 'off')
            .attr({
                type: 'text', id: 'formSearch', placeholder: this.context.i18n.t(
                    this.props.placeholderText)
            })
            .ref('searchInput');

        var inlineIcon = $$(SpinnerComponent, {isSearching: this.state.isSearching});

        formGroup.append(inlineIcon);
        formGroup.append(searchInput);


        var el = $$('div').addClass('search__container').ref('searchContainer');
        var list = $$('ul').attr('id', 'searchResult').ref('searchResult');

        if (this.state.items.length > 0) {
            list.addClass('isSearching');
        }

        this.state.items.forEach(function (item, idx) {
            var itemToSave = _.clone(item);

            var title = item.title,
              
                itemId = 'item-' + item.id;

            itemToSave.inputValue = this.refs.searchInput.val();


            var itemEl = $$('li');
            if (item.exists === true) {
                itemEl.addClass('item__exists');
                itemEl.append($$('span').append("\u2713 ").addClass('item__found'));
            }
            itemEl.append($$('span').append(title).addClass('item__title'))
                .append($$('span'))
                .attr('id', itemId);

            itemEl.on('click', function () {
                this.doAction(itemToSave);
            }.bind(this));

            if (this.state.currentSelectedIndex === idx) {
                this.currentSelectedItem = itemToSave;
                itemEl.addClass('active');
            }

            list.append(itemEl);
        }.bind(this));

        el.append(formGroup);
        el.append(list);

        return el;
    };

};
Component.extend(FormSearchComponent);
module.exports = FormSearchComponent;
