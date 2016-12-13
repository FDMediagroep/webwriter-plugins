import './scss/planneddateselector.scss'
import PlanneddateselectorComponent from './PlanneddateselectorComponent';

export default {
  id: 'nl.fdmg.planneddateselector',
  name: 'planneddateselector',
  configure: function (config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', PlanneddateselectorComponent)
  }
}
