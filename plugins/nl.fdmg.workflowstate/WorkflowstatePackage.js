import WorkflowstateComponent from './WorkflowstateComponent'

export default {
  id: 'nl.fdmg.workflowstate',
  name: 'workflowstate',
  configure: function(config) {
    config.addPopover(
      this.name,
      {
        icon: 'fa-circle',
        align: 'right'
      },
      WorkflowstateComponent
    )
    config.addLabel('Workflowstate', {nl: 'Desknet status'})
    config.addLabel('Select workflow state', {nl: 'Selecteer een desknet status'})
    config.addLabel('Cancel', {nl: 'Annuleren'})
  }
}
