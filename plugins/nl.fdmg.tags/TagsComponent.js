import {Component} from 'substance'
import {api} from 'writer'
import TagsList from './TagsListComponent'
import SearchField from '../nl.fdmg.searchfield/SearchFieldComponent'
import './scss/tags.scss'
const pluginId = 'nl.fdmg.tags'

class TagsComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'tags'
  }

  getInitialState() {
    return {
      existingTags: this._getExistingTags()
    }
  }

  reloadTags() {
    this.extendState({
      existingTags: this._getExistingTags()
    })
  }

  searchTags(query) {
    const endpoint = api.getConfigValue(pluginId, 'searchEndpoint')
    const token = api.getConfigValue(pluginId, 'token')
    const url = endpoint + query

    return fetch(url, {
      method: 'GET',
      headers: {
        'x-access-token': `Bearer ${token}`
      }
    })
      .then(response => api.router.checkForOKStatus(response))
      .then(response => api.router.toJson(response))
      .then(response => response.map(item => {
        return {
          rel: 'tag',
          name: item.tag,  // Used by FD4
          title: item.tag, // Used by api.newsItem
          label: item.tag, // Used by SearchField
          type: 'x-im/category',
          uuid: 'tag-' + item.id,
          id: item.id
        }
      }))
  }

  addTag(tag) {
    try {
      api.newsItem.addTag(this.name, {
        name: [tag.title],
        uuid: tag.uuid,
        imType: [tag.type]
      })
      this.reloadTags()
    } catch (e) {
      console.warn(e)
    }
  }

  removeTag(tag) {
    try {
      api.newsItem.removeLinkByUUIDAndRel(this.name, tag.uuid, 'subject')
      this.reloadTags()
    } catch (e) {
      console.warn(e);
    }
  }

  render($$) {
    return $$('div')
      .addClass('tags')
      .append(
        $$('h2').append(this.getLabel('Tags')),
        $$(TagsList, {
          existingTags: this.state.existingTags,
          removeTag: this.removeTag.bind(this)
        }),
        $$(SearchField, {
          existingItems: this.state.existingTags,
          doSearch: this.searchTags.bind(this),
          onSelect: this.addTag.bind(this),
          onCreate: this.addTag.bind(this),
          createAllowed: false,
          placeholderText: this.getLabel('Add tag')
        }),
        $$('hr')
      )
  }

  _getExistingTags() {
    const tags = api.newsItem.getTags(["x-im/category"])

    return tags.map(tag => {
      tag['name'] = tag.title
      return tag
    })
  }
}

export default TagsComponent
