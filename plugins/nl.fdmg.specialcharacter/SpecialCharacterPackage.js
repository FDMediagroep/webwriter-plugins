import './scss/specialcharacter.scss';
import SpecialCharacterCommand from './SpecialCharacterCommand';
import specialCharacterTool from './SpecialCharacterTool';
import { platform } from 'substance';

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