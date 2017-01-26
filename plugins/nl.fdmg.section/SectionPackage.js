import SectionComponent from './SectionComponent'
import SectionValidator from './SectionValidator'

export default {
  id: 'nl.fdmg.section',
  name: 'section',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', SectionComponent)

    config.addValidator(SectionValidator)

    config.addLabel('Section', {'nl': 'Sectie'})
    config.addLabel('- no selection -', {'nl': '- geen selectie -'})
    config.addLabel('free input', {'nl': 'vrije invoer'})
    config.addLabel('Missing section', {'nl': 'Sectie ontbreekt'})
  }
}
