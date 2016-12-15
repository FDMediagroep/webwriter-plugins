import WorkflowstateComponent from './WorkflowstateComponent'

export default {
  id: 'nl.fdmg.workflowstate',
  name: 'workflowstate',
  configure: function(config) {
    config.addPopover(
      this.name,
      {
        icon: 'fa-circle',
        align: 'left'
      },
      WorkflowstateComponent
    )
  }
}
