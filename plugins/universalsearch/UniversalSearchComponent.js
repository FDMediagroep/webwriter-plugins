'use strict';
var Component = require('substance/ui/Component');
var SpinnerComponent = require('./SpinnerComponent');
var $$ = Component.$$;
var _ = require('lodash');
function UniversalSearchComponent() {
  UniversalSearchComponent.super.apply(this, arguments);
  if (this.props.createAllowed && !this.props.onCreate) {
    console.warn('Creation of items is allowed but onCreate method is missing');
  }
}
/**
 * Props to pass:
 *
 * doSearch {function} Perform search and return a list of elements
 * onSelect {function} Selects an element
 * onCreate {function} If allowing to create new items - pass this function
 * existingItems {array} List of already existing items
 * value {string} Value of the input
 * placeholderText {string} Placeholder text inside input
 * createAllowed {boolean} If creation of new elements is allowed
 * wildcardsearch {boolean} Always append * to search queries
 */
UniversalSearchComponent.Prototype = function() {
  this.getInitialState = function() {
    return {
      items: [],
      currentSelectedIndex: 0,
      isSearching: false
    };
  }
  this.render = function() {
    var formGroup = $$('div').addClass('form-group').ref('formGroup');
    var searchInput = $$('input')
      .addClass('form-control')
      .addClass('form__search')
      .on('keyup', this.search)
      .attr({
        autocomplete: 'off',
        type: 'text',
        id: 'formSearch',
        value: this.props.value,
        placeholder: this.context.i18n.t(this.props.placeholderText)
      })
      .ref('searchInput');
    var inlineIcon = $$(SpinnerComponent, { isSearching: this.state.isSearching });
    formGroup.append(inlineIcon);
    formGroup.append(searchInput);
    var el = $$('div').addClass('search__container').ref('searchContainer')
    var list = $$('ul').attr({ 'id': 'searchResult' }).ref('searchResult')
    if (this.state.items.length > 0) {
      list.addClass('isSearching');
    }
    this.state.items.forEach(function(item, idx) {
      //@TODO: Why is itemToSave needed?
      var itemToSave = _.clone(item);
      var name = item.name;

      if (item.id == '__create-new') {
        name = this.context.i18n.t('Create') + ': ' + name;
      }

      var itemId = 'item-' + item.id;
      var itemEl = $$('li');
      if (item.exists === true) {
        itemEl.addClass('item__exists');
        itemEl.append($$('span').append('\u2713').addClass('item__found'));
      }
      itemEl.append($$('span').append(name).addClass('item__name'))
        .attr({ 'id': itemId });
      itemEl.on('click', function() {
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
  }
  this.search = function(e) {
    switch (e.keyCode) {
      case 38:  // up arrow
        if (e.shiftKey) { return; }
        e.preventDefault();
        this.prev();
        break;
      case 40: // down arrow
        if (e.shiftKey) { return; }
        e.preventDefault();
        this.next();
        break;
      case 9:   // tab
      case 13:  // enter
        e.preventDefault();
        if (this.state.items.length === 0) { return; }
        this.select();
        break;
      case 27:  // escape
        this.hide();
        break;
      default:
        this.lookup();
    }
  }
  this.doAction = function(item) {
    //@TODO: Change this function name
    if (item.exists) {
      return;
    }

    if (this.props.onCreate && this.props.createAllowed && item.id === '__create-new') {
      this.props.onCreate(item, itemAlreadyExists(this.state.items, item));
    } else {
      this.props.onSelect(item);
    }
    this.hide();
  }
  function itemAlreadyExists(items, item) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id !== '__create-new') {
        return true;
      }
    }
    return false;
  }
  this.hide = function() {
    this.refs.searchInput.val('');
    this.extendState({
      items: [],
      currentSelectedIndex: 0,
      isSearching: false
    });
  }
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
  }
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
  }
  this.select = function() {
    this.doAction(this.currentSelectedItem);
  }
  this.lookup = function() {
    var input = this.refs.searchInput.val();
    this.extendState({ isSearching: true })
    if (input.length === 0) {
      this.extendState({
        items: [],
        currentSelectedIndex: 0,
        isSearching: false
      });
      return;
    }
    if (this.props.wildcardsearch) {
      input += '*';
    }
    this.props.doSearch(input, function(err, data) {
      if (err) {
        console.error(err);
      } else {
        this.extendState({
          items: this.getItemsThatNotExisting(data),
          isSearching: false
        });
      }
    }.bind(this));
  }
  this.getItemsThatNotExisting = function(data) {
    var existingItems = this.props.existingItems;
    if (this.props.onCreate && this.props.createAllowed) {
      data.push(this.getCreateNewItem());
    }
    var existingItemsMap = {};
    if (existingItems) {
      existingItems.forEach(function(item) {
        existingItemsMap[item.title] = true;
      });
    }
    data.forEach(function(item) {
      if (existingItemsMap[item.title]) {
        item.exists = true;
      }
    });
    return data;
  }
  this.getCreateNewItem = function() {
    return {
      name: this.refs.searchInput.val(),
      id: '__create-new'
    };
  }
}
Component.extend(UniversalSearchComponent);
module.exports = UniversalSearchComponent;
