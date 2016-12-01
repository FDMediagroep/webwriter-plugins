import RubricComponent from './RubricComponent'

export default {
  id: 'nl.fdmg.rubric',
  name: 'rubric',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', RubricComponent)

    config.addLabel('Rubric', {
      'nl': 'Rubriek'
    })
    config.addLabel('- no selection -', {
      'nl': '- geen selectie -'
    })
    config.addLabel('free input', {
      'nl': 'vrije invoer'
    })
  }
}
