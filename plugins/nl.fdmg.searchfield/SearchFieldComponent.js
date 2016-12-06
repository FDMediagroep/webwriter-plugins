import {Component} from 'substance'
import SpinnerComponent from './SpinnerComponent'
import {clone, debounce} from 'lodash'

/**
 * Props to pass:
 * onSelect {function}
 * onCreate {function} If allowing to create new items - pass this function
 * doSearch {function}
 * existingItems {array}
 * placeholderText {string} Placehold text inside input
 * createAllowed {bool} If creation of new elements is allowed
 *
 * When selecting this.props.onSelect
 * @constructor
 */
class SearchFieldComponent extends Component {
  constructor(...args) {
    super(...args)

    if (this.props.createAllowed && !this.props.onCreate) {
      console.warn('Creation of items is allowed but onCreate method is missing')
    }

    this.debouncedSearch = debounce(this._search, 300)
  }

  getInitialState() {
    return {
      items: [],
      currentSelectedIndex: 0,
      isSearching: false
    }
  }

  render($$) {
    const formGroup = $$('div').addClass('form-group').ref('formGroup')

    const searchInput = $$('input')
      .addClass('form-control')
      .addClass('form__search')
      .on('keyup', this.onSearchInputKeyUp)
      .attr('autocomplete', 'off')
      .attr({
        type: 'text',
        id: 'formSearch',
        placeholder: this.props.placeholderText
      })
      .ref('searchInput')

    const inlineIcon = $$(SpinnerComponent, {isSearching: this.state.isSearching})

    formGroup.append(inlineIcon)
    formGroup.append(searchInput)

    const el = $$('div').addClass('search__container').ref('searchContainer')
    const list = $$('div').attr({id: 'searchResult'}).ref('searchResult')

    if (this.state.items.length > 0) {
      list.addClass('isSearching')
    }

    this.state.items.forEach((item, idx) => {
      const itemToSave = clone(item)

      let label = item.label
      if (item.id === '__create-new') {
        label = `${this.getLabel('Create')} : ${label}`
      }

      const itemId = 'item-' + item.id
      const itemEl = $$('li')

      if (item.exists) {
        itemEl.addClass('item__exists')
        itemEl.append($$('span').append('\u2713').addClass('item__found'))
      }

      itemEl
        .append($$('span').append(label).addClass('item__name'))
        .attr({id: itemId})
        .on('click', () => {
          this.select(itemToSave)
        })

      if (this.state.currentSelectedIndex === idx) {
        this.currentSelectedItem = itemToSave
        itemEl.addClass('active')
      }

      list.append(itemEl)
    })

    el.append(formGroup)
    el.append(list)

    return el
  }

  onSearchInputKeyUp(e) {
    switch (e.keyCode) {
      case 38:  // up arrow
        if (e.shiftKey) return
        e.preventDefault()
        this.prev()
        break;
      case 40:  // down arrow
        if (e.shiftKey) return
        e.preventDefault()
        this.next()
        break
      case 9:   // tab
      case 13:  // enter
        e.preventDefault()
        if (this.state.items.length === 0) return
        this.select(this.currentSelectedItem)
        break
      case 27:  // escape
        this.hide()
        break;
      default:
        this.search(this.refs.searchInput.val())
    }
  }

  get search() {
    return this.debouncedSearch
  }

  _search(query) {
    if (query.length === 0) {
      this.hide()
      return
    }

    if (query.length < 2) return

    this.extendState({isSearching: true})

    this.props.doSearch(query)
      .then(items => {
        this.extendState({
          items: this.getItemsThatNotExisting(items),
          isSearching: false
        })
      }, (err) => {console.warn(err)})
  }

  select(item) {
    if (item.exists) return

    if (this.props.onCreate && this.props.createAllowed && item.id === '__create-new') {
      this.props.onCreate(item, itemAlreadyExists(this.state.items, item))
    } else {
      this.props.onSelect(item)
    }

    this.hide()

    function itemAlreadyExists(items, item) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].id !== '__create-new' && items[i].label.toLowerCase() === item.label.toLowerCase()) return true
      }
    }
    return false
  }

  next() {
    const selectedDomItem = document.getElementById('item-' + this.currentSelectedItem.id)
    let currentSelectedItem = this.currentSelectedItem && selectedDomItem
    if (currentSelectedItem) {
      let searchResultElement = this.refs.searchResult.el.el
      let selectedItem = selectedDomItem
      let items = this.state.items

      if (this.state.currentSelectedIndex >= 0) {
        let idx = parseInt(this.state.currentSelectedIndex, 10)
        idx += 1

        searchResultElement.scrollTop = selectedItem.offsetTop
        this.extendState({currentSelectedIndex: idx})

        if (idx === items.length) {
          this.extendState({currentSelectedIndex: 0})
          searchResultElement.scrollTop = 0
        }
      }
    }
  }

  prev() {
    const selectedDomItem = document.getElementById('item-' + this.currentSelectedItem.id)
    let currentSelectedItem = this.currentSelectedItem && selectedDomItem
    if (currentSelectedItem) {
      let searchResultElement = this.refs.searchResult.el.el
      let selectedItemPrevSibling = selectedDomItem.previousSibling
      let items = this.state.items

      if (this.state.currentSelectedIndex >= 0) {
        let idx = parseInt(this.state.currentSelectedIndex, 10)

        if (selectedItemPrevSibling === null) {
          searchResultElement.scrollTop = searchResultElement.lastChild.offsetTop
          this.extendState({currentSelectedIndex: items.length - 1})
        } else {
          let offsetTop = selectedItemPrevSibling.offsetTop
          let offsetHeight = selectedItemPrevSibling.offsetHeight

          searchResultElement.scrollTop = offsetTop - offsetHeight
          idx -= 1
          this.extendState({currentSelectedIndex: idx})
        }
      }
    }
  }

  hide() {
    this.refs.searchInput.val('')
    this.extendState({
      items: [],
      currentSelectedIndex: 0,
      isSearching: false
    })
  }

  getItemsThatNotExisting(items) {
    const existingItems = this.props.existingItems;

    if (this.props.onCreate && this.props.createAllowed) {
      items.push({
        label: this.refs.searchInput.val(),
        id: '__create-new'
      });
    }

    const existingItemsMap = {};
    if (existingItems) {
      existingItems.forEach(function(item) {
        existingItemsMap[item.label] = true;
      });
    }

    items.forEach(function(item) {
      if (existingItemsMap[item.label]) {
        item.exists = true;
      }
    })

    return items;
  }
}

export default SearchFieldComponent
