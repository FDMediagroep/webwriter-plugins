function Workflowstate() {
}

Workflowstate.prototype.schema = {
  name: 'workflowstate',
  vendor: 'nl.fdmg',
  uicomponents: {
    sidebar: {
      top: [
        require('./WorkflowstateComponent')
      ]
    }
  }
}

module.exports = Workflowstate
