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
    config.addLabel('Workflowstate', {'nl': 'Workflowstatus'})
    config.addLabel('Select workflow state', {'nl': 'Selecteer een workflowstatus'})
    config.addLabel('Cancel', {'nl': 'Annuleren'})
  }
}
