import './scss/specialcharacter.scss';
import SpecialCharacterCommand from './SpecialCharacterCommand';
import specialCharacterTool from './SpecialCharacterTool';

export default {
  name: 'specialcharacter',
  id: 'nl.fdmg.specialcharacter',
  configure: function(config) {

    config.addCommand('specialcharacter', SpecialCharacterCommand, {nodeType: 'specialcharacter'});
    
    config.addContentMenuTopTool('specialcharacter', specialCharacterTool);

    config.addLabel('insert', {
      'nl': 'invoegen'
    });

  }
}