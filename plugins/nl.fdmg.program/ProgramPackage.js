import ProgramComponent from './ProgramComponent';
import ProgramValidator from './ProgramValidator';

export default {
  id: 'nl.fdmg.program',
  name: 'program',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', ProgramComponent);
    config.addValidator(ProgramValidator);


    config.addLabel('Program', {'nl': 'Program'});
    config.addLabel('Program value missing', {'nl': 'Artikel is gemarkeerd als programma artikel maar geen programma geselecteerd'});
  }
}
