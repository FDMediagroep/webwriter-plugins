import './scss/planneddate.scss';
import PlanneddateComponent from './PlanneddateComponent';

export default {
  id: 'nl.fdmg.planneddate',
  name: 'planneddate',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', PlanneddateComponent);

    config.addLabel('Planned date', {
      'nl': 'Desknet datum'
    });
    config.addLabel('no-date-specified', {
      'nl': 'Geen datum ingesteld'
    });
  }
}