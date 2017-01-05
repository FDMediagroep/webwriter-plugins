import TextcountSelectorComponent from './TextcountSelectorComponent'
import TextcountSelectorValidator from './TextcountSelectorValidator'

export default {
  id: 'nl.fdmg.textcountselector',
  name: 'textcountselector',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'advancedTab', TextcountSelectorComponent)
    config.addValidator(TextcountSelectorValidator)
    config.addLabel('Textcount size', {
      'nl': 'Tekstlengte (karakters)'
    })
    config.addLabel('Missing text length', {
      'nl': 'Tekstlengte is niet ingesteld'
    })
  }
}
