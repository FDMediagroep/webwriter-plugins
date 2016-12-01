import SectionComponent from './SectionComponent'

export default {
  id: 'nl.fdmg.section',
  name: 'section',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', SectionComponent)

    config.addLabel('Section', {
      'nl': 'Sectie'
    })
    config.addLabel('- no selection -', {
      'nl': '- geen selectie -'
    })
    config.addLabel('free input', {
      'nl': 'vrije invoer'
    })
  }
}
