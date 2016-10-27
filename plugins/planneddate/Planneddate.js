function Planneddate() {
}

Planneddate.prototype.schema = {
  name: 'planneddate',
  vendor: 'nl.fdmg',
  uicomponents: {
    sidebar: {
      top: [
        require('./PlanneddateComponent')
      ]
    }
  }
}

module.exports = Planneddate
