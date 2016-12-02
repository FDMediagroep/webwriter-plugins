import {Component, FontAwesomeIcon} from 'substance'
import {api, idGenerator} from 'writer'
import SearchFieldComponent from '../nl.fdmg.searchfield/SearchFieldComponent'

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
              $$('span').addClass('epic__name notClickable meta').append(epic.name),
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
    const epic = api.newsItem.getLinkByType(this.name, this.type).pop()

    if (epic) {
      return {
        id: epic['@id'],
        name: epic['@name']
      }
    }

    return undefined;
  }

  searchEpic(query) {

    return Promise.resolve([
      {id:0, name: 'Foo'},
      {id:1, name: 'Bar'},
      {id:2, name: 'Baz'}
    ])

    // const endpoint = api.getConfigValue(pluginId, 'endpoint')
    // return api.router.get('/api/resourceproxy/', {url: endpoint + query})
    //   .then(response => this.context.api.router.checkForOKStatus(response))
    //   .then(response => this.context.api.router.toJson(response))
    //   .then(response => {
    //
    //     // FIXME Transform response into [{id,name}*] for searchfield
    //
    //     console.log(response)
    //     return response
    //   })
  }

  setEpic(epic) {
    this.removeEpic()

    const link = {
      '@rel': this.name,
      '@type': this.type,
      '@id': epic.id,
      '@name': epic.name,
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
    api.newsItem.getLinkByType(this.name, this.type)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel'])
      })

    this.reloadEpic()
  }
}

export default EpicComponent
