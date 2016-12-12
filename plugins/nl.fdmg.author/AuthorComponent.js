import {Component} from 'substance'
import {api, NilUUID, idGenerator} from 'writer'
import AuthorList from './AuthorListComponent'
import SearchField from '../nl.fdmg.searchfield/SearchFieldComponent'
import './scss/author.scss'
const pluginId = 'nl.fdmg.author'

class AuthorComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'author'
  }

  getInitialState() {
    return {
      existingAuthors: this._getExistingAuthors()
    }
  }

  reloadAuthors() {
    this.extendState({
      existingAuthors: this._getExistingAuthors()
    })
  }

  searchAuthors(query) {
    const endpoint = api.getConfigValue(pluginId, 'endpoint')
    const token = api.getConfigValue(pluginId, 'token')

    return api.router.get('/api/resourceproxy', {
      url: endpoint + query,
      headers: {
        'x-access-token': `Bearer ${token}`
      }
    })
    // return fetch(endpoint + query, {
    //   method: 'GET',
    //   headers: {
    //     'x-access-token': `Bearer ${token}`
    //   }
    // })
      .then(response => api.router.checkForOKStatus(response))
      .then(response => api.router.toJson(response))
      .then(response => response.map(item => {
        return {
          rel: 'author',
          name: item.fullName,  // Used by FD4
          title: item.fullName, // Used by api.newsItem
          label: item.fullName, // Used by SearchField
          type: 'x-im/author',
          uuid: idGenerator(),
          id: item.id
        }
      }))
  }

  createAuthor(authorTemp) {
    console.log(authorTemp)
    api.newsItem.addSimpleAuthor(this.name, authorTemp.label)
    this.reloadAuthors()
  }

  addAuthor(author) {
    try {
      api.newsItem.addAuthor(this.name, author)
      this.reloadAuthors()
    } catch (e) {
      console.warn(e)
    }
  }

  removeAuthor(author) {
    try {
      if (NilUUID.isNilUUID(author.uuid)) {
        api.newsItem.removeAuthorByTitle(this.name, author.title)
      } else {
        api.newsItem.removeAuthorByUUID(this.name, author.uuid)
      }
      this.reloadAuthors()
    } catch (e) {
      console.warn(e);
    }
  }

  render($$) {
    return $$('div')
      .addClass('authors')
      .append(
        $$('h2').append(this.getLabel('Author')),
        $$(AuthorList, {
          existingAuthors: this.state.existingAuthors,
          removeAuthor: this.removeAuthor.bind(this)
        }),
        $$(SearchField, {
          existingItems: this.state.existingAuthors,
          doSearch: this.searchAuthors.bind(this),
          onSelect: this.addAuthor.bind(this),
          onCreate: this.createAuthor.bind(this),
          createAllowed: true,
          placeholderText: this.getLabel('Add author')
        }),
        $$('hr')
      )
  }

  _getExistingAuthors() {
    const authors = api.newsItem.getAuthors()
    return authors.map(author => {
      author['name'] = author.title   // Used by FD4
      author['label'] = author.title  // Used by SearchField
      return author
    })
  }
}

export default AuthorComponent
