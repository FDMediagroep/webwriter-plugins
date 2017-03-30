import './scss/ximteaser.scss';
import XimteaserComponent from './XimteaserComponent';
import XimteaserConverter from './XimteaserConverter';
import Ximteaser from './Ximteaser';
import XimteaserTool from './XimteaserTool';
import XimteaserCommand from './XimteaserCommand';
import XimteaserInsertImageCommand from './XimteaserInsertImageCommand';
import XimTeaserValidator from './XimTeaserValidator';

import { platform } from 'substance';
export default {
  name: 'ximteaser',
  id: 'se.infomaker.ximteaser',
  configure: function(config, pluginConfig) {
    config.addValidator(XimTeaserValidator);
    config.addNode(Ximteaser);
    config.addComponent(Ximteaser.type, XimteaserComponent);
    config.addConverter('newsml', XimteaserConverter);

    config.addContentMenuTopTool('ximteaser', XimteaserTool);
    config.addCommand('ximteaser', XimteaserCommand, pluginConfig);

    config.addCommand('ximteaserinsertimage', XimteaserInsertImageCommand, pluginConfig);

    config.addIcon('ximteaser', { 'fontawesome': ' fa-newspaper-o' });
    config.addLabel('Teaser', {
      'nl': 'Ankeiler op home'
    });

    config.addLabel('teaser-add-image', {
      'en': 'Add image',
      'nl': "Afbeelding toevoegen"
    })
    config.addLabel('teaser-replace-image', {
      'en': 'Replace image',
      'nl': "Huidige afbeelding vervangen"
    })

    config.addLabel('Missing teaser title', {
      'nl': 'Ankeiler op home titel ontbreekt'
    });

    config.addLabel('Missing teaser body', {
      'nl': 'Ankeiler op home tekst ontbreekt (\u00B6)'
    });

    config.addLabel('Missing teaser', {
      'nl': 'Ankeiler op home ontbreekt'
    });

    config.addLabel('More than one teaser', {
      'nl': "Meerdere 'Ankeiler op home' gevonden"
    });

    if (platform.isMac) {
      config.addKeyboardShortcut('cmd+alt+t', { command: 'ximteaser' });
    } else {
      config.addKeyboardShortcut('ctrl+alt+t', { command: 'ximteaser' });
    }
  }
}