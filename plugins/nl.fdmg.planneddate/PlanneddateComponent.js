import {Component} from 'substance'
import {api, idGenerator} from 'writer'

class PlanneddateComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'planneddate'
    this.type = 'fdmg/textanalyzer'
  }

  getInitialState() {
    const initialDate = api.newsItem
      .getLinkByType(this.name, this.type)

    if (!initialDate || initialDate.length < 1) {
      return { initialDate : { initialDate : { date : '', time : ''} } }
    } else {
      return { initialDate : initialDate.map(initialDate => {
        return { date : initialDate['@date'], uuid : initialDate['@uuid'], time : initialDate['@time'] } })
      }
    }
  }

  render($$) {
    const el = $$('div').addClass('fdmg-sidebar')
    const heading = $$('div').append($$('h2').append(this.getLabel('Planned date')))
    const pluginWrapper = $$('div').addClass('planneddate')


    const date = this.state.initialDate.date
    const time = this.state.initialDate.time

    const dateComponent =
          $$('input').attr({
            type : 'date',
            id : 'plannedDate',
            vale : date
          }).addClass('form-control date').ref('dateInput').on('blur', () => { this.updateDate() })

    const timeComponent =
          $$('input').attr({
            type: 'time',
            id: 'plannedTime',
            value: time,
          }).addClass('form-control time').ref('timeInput').on("blur", () =>{ this.updateDate() })

    pluginWrapper.append(dateComponent, timeComponent)
    el.append(heading, pluginWrapper, $$('hr'))

    return el
  }

  updateDate(){
    this.deleteDate()

    const date = this.refs.dateInput.val()
    const time = this.refs.timeInput.val()

    if (date !== '') {
      api.newsItem.addLink('planneddate', {
        '@uuid': idGenerator(),
        '@type': 'fdmg/planneddate',
        '@rel' : 'planneddate',
        '@date' : date,
        '@time' : time
      })
    }
  }

  deleteDate() {
    api.getLinkByType('planneddate', 'fdmg/planneddate')
      .forEach( planneddate => {
        api.removeLinkByUUIDAndRel('planneddate', planneddate['@uuid'], planneddate['@rel'])
      })
  }
}
export default PlanneddateComponent
