import TextcountSelectorComponent from './TextcountSelectorComponent'

export default {
  id: 'nl.fdmg.textcountselector',
  name: 'textcountselector',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', TextcountSelectorComponent)
  }
}
