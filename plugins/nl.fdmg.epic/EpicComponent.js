import {Component, FontAwesomeIcon} from 'substance'
import {api, idGenerator} from 'writer'
import SearchFieldComponent from '../nl.fdmg.searchfield/SearchFieldComponent'
import './scss/epic.scss'

const pluginId = 'nl.fdmg.epic'

class EpicComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'epic'
    this.type = 'fdmg/epic'
  }

  getInitialState() {
    return {
      epic: this.readEpic()
    }
  }

  render($$) {
    const epic = this.state.epic

    const searchComponent = $$(SearchFieldComponent, {
      existingItems: epic ? [epic] : [],
      doSearch: this.searchEpic.bind(this),
      onSelect: this.setEpic.bind(this),
      onCreate: this.setEpic.bind(this),
      createAllowed: true,
      placeholderText: this.getLabel('Select epic')
    }).ref('searchComponent')

    let epicEl = $$('span')

    if (epic) {
      epicEl = $$('div')
        .addClass('epic__item')
        .append(
          $$('div')
            .addClass('metadata__container')
            .append(
              $$('span').addClass('epic__name notClickable meta').append(epic.label),
              $$('button').append($$(FontAwesomeIcon, {icon: 'fa-times'})).on('click', this.removeEpic)
            )
        )
      searchComponent.addClass('hidden')
    }

    return $$('div')
      .addClass('editContainer')
      .append(
        $$('h2').append(this.getLabel('Epic')),
        epicEl,
        searchComponent,
        $$('hr')
      )
  }

  readEpic() {
    const epic = api.newsItem.getLinkByType('epic', 'fdmg/epic').pop()
    if (epic) {
      return {
        id: epic['@id'],
        label: epic['@name']
      }
    }

    return undefined;
  }

  searchEpic(query) {
    const endpoint = api.getConfigValue(pluginId, 'endpoint')
    const token = api.getConfigValue(pluginId, 'token')

    // return api.router.get('/api/resourceproxy', {
    //   url: endpoint + query,
    //   headers: {
    //     'x-access-token': `Bearer ${token}`
    //   }
    // })
    return fetch(endpoint + query, {
      method: 'GET',
      headers: {
        'x-access-token': `Bearer ${token}`
      }
    })
      .then(response => api.router.checkForOKStatus(response))
      .then(response => api.router.toJson(response))
      .then(response => response.map(epic => {
        return {id: epic.id, label: epic.title}
      }))
  }

  setEpic(epic) {
    this.removeEpic()

    const link = {
      '@rel': this.name,
      '@type': this.type,
      '@id': epic.id,
      '@name': epic.label,
      '@uuid': idGenerator()
    }

    if (epic.id === '__create-new') {
      delete link['@id']
    }

    api.newsItem.addLink(this.name, link)

    this.reloadEpic()
  }

  reloadEpic() {
    this.extendState({epic: this.readEpic()})
  }

  removeEpic() {
    api.newsItem.getLinkByType('epic', 'fdmg/epic')
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel'])
      })

    this.reloadEpic()
  }
}

export default EpicComponent
