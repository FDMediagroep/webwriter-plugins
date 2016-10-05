'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;
var SpinnerComponent = require('./SpinnerComponent');
var _ = require('lodash');

function UniversalSearchComponent() {
  UniversalSearchComponent.super.apply(this, arguments);

  if (this.props.createAllowed && !this.props.onCreate) {
    console.warn('Creation of items is allowed but onCreate method is missing');
  }
}

UniversalSearchComponent.Prototype = function() {

  this.getInitialState = function() {
    return {
      items: [],
      currentSelectedIndex: 0,
      isSearching: false
    };
  };

  this.render = function() {
    var formGroup = $$('div')
      .addClass('form-group')
      .ref('formGroup');
    var searchInput = $$('input')
      .addClass('form-control')
      .addClass('form__search')
      .attr({
        autocomplete: 'off',
        type: 'text',
        id: 'formSearch',
        value: this.props.value,
        placeholder: this.props.placeholderText
      })
      .on('keyup', this.onKeyup)
      .ref('searchInput');
    var inlineIcon = $$(SpinnerComponent, { isSearching: this.state.isSearching });

    formGroup.append(inlineIcon, searchInput);

    var el = $$('div')
      .addClass('search__container')
      .ref('searchContainer');
    var list = $$('ul')
      .attr({ id: 'searchResult' })
      .ref('searchResult');

    if (this.state.items.length > 0) {
      list.addClass('isSearching');
    }

    this.state.items.forEach(function(item, i) {
      var itemToSave = _.clone(item);
      var name = item.name;

      if (item.id === '__create-new') {
        name = this.context.i18n.t('Create') + ': ' + name;
      }

      var itemId = 'item-' + item.id;
      var itemEl = $$('li');

      if (item.exists) {
        itemEl.addClass('item__exists');
        itemEl.append($$('span').append('\u2713').addClass('item__found'));
      }

      itemEl
        .append($$('span').append(name).addClass('item__name'))
        .attr({ id: itemId })
        .on('click', function() {
          this.select(itemToSave);
        }.bind(this));

      if (this.state.currentSelectedIndex === i) {
        this.currentSelectedItem = itemToSave;
        itemEl.addClass('active');
      }

      list.append(itemEl);
    }.bind(this));

    el.append(formGroup, list);

    return el;
  };

  this.onKeyup = function(e) {
    switch (e.keyCode) {
      case 38:  // up arrow
        if (e.shiftKey) return;
        e.preventDefault();
        this.prev();
        break;
      case 40:  // down arrow
        if (e.shiftKey) return;
        e.preventDefault();
        this.next();
        break;
      case 9:   // tab
      case 13:  // enter
        e.preventDefault();
        if (this.state.items.length === 0) return;
        this.select(this.currentSelectedItem);
        break;
      case 27:  // escape
        this.hide();
        break;
      default:
        this.search(this.refs.searchInput.val());
    }
  };

  this.select = function(item) {
    if (item.exists) {
      return;
    }

    if (this.props.onCreate && this.props.createAllowed && item.id === '__create-new') {
      this.props.onCreate(item, itemAlreadyExists(this.state.items, item));
    } else {
      this.props.onSelect(item);
    }

    this.hide();

    // TODO Replace with Array.(any|some)
    function itemAlreadyExists(items, item) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id !== '__create-new') {
          return true;
        }
      }
      return false;
    }
  };

  this.prev = function() {
    var searchResultElement = this.refs.searchResult.el;
    var selectedItemPrevSibling = $('#item-' + this.currentSelectedItem.id)[0].previousSibling;
    var items = this.state.items;

    if (this.state.currentSelectedIndex >= 0) {
      var idx = parseInt(this.state.currentSelectedIndex);

      idx -= 1;

      this.extendState({ currentSelectedIndex: idx });

      if (idx === -1) {
        this.extendState({ currentSelectedIndex: items.length - 1 });
        searchResultElement.scrollTop = searchResultElement.lastChild.offsetTop;
      } else {
        searchResultElement.scrollTop = selectedItemPrevSibling.offsetTop;
      }
    }
  };

  this.next = function() {
    var searchResultElement = this.refs.searchResult.el;
    var selectedItem = $('#item-' + this.currentSelectedItem.id)[0];
    var items = this.state.items;

    if (this.state.currentSelectedIndex >= 0) {
      var idx = parseInt(this.state.currentSelectedIndex);
      idx += 1;
      this.extendState({ currentSelectedIndex: idx });
      searchResultElement.scrollTop = selectedItem.offsetTop;

      if (idx === items.length) {
        this.extendState({ currentSelectedIndex: 0 });
        searchResultElement.scrollTop = 0;
      }
    }
  };

  this._search = function(query) {

    if (query.length == 0) {
      this.hide();
      return;
    }

    if (query.length < 2) {
      return;
    }

    this.extendState({ isSearching: true });

    this.props.doSearch(query, function(err, items) {
      if (err) {
        console.error(err);
        return;
      }

      this.extendState({
        items: this.getItemsThatNotExisting(items),
        isSearching: false
      })
    }.bind(this));
  };

  this.search = _.debounce(this._search, 300);

  this.hide = function() {
    this.refs.searchInput.val('');
    this.extendState({
      items: [],
      currentSelectedIndex: 0,
      isSearching: false
    });
  };

  this.getItemsThatNotExisting = function(items) {
    var existingItems = this.props.existingItems;

    if (this.props.onCreate && this.props.createAllowed) {
      items.push({
        name: this.refs.searchInput.val(),
        id: '__create-new'
      });
    }

    var existingItemsMap = {};
    if (existingItems) {
      existingItems.forEach(function(item) {
        existingItemsMap[item.name] = true;
      });
    }

    items.forEach(function(item) {
      if (existingItemsMap[item.name]) {
        item.exists = true;
      }
    })

    return items;
  };
}

Component.extend(UniversalSearchComponent);
module.exports = UniversalSearchComponent;
