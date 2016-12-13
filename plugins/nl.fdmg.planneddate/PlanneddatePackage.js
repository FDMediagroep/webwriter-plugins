import './scss/planneddate.scss'
import PlanneddateComponent from './PlanneddateComponent';

export default {
  id: 'nl.fdmg.planneddate',
  name: 'planneddate',
  configure: function (config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', PlanneddateComponent)

    config.addLabel('Planned date', {
      'nl': 'Desknet datum'
    })
  }
}
