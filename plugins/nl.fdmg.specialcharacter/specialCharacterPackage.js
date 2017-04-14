import './scss/specialcharacter.scss';
import SpecialCharacterCommand from './specialCharacterCommand';
import specialCharacterTool from './specialCharacterTool';
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

    if (platform.isMac) {
      config.addKeyboardShortcut('cmd+alt+y', { command: 'specialcharacter' });
    } else {
      config.addKeyboardShortcut('ctrl+alt+y', { command: 'specialcharacter' });
    }

  }
}