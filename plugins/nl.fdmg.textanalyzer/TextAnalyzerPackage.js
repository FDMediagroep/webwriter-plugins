import TextAnalyzerComponent from './TextAnalyzerComponent';
import TextAnalyzerValidator from './TextAnalyzerValidator';

export default {
  id: 'nl.fdmg.textanalyzer',
  name: 'textanalyzer',
  index: 5000,
  configure: function(config) {
    config.addPopover(
      this.name,
      {
        icon: 'fa-info',
        align: 'right'
      },
      TextAnalyzerComponent
    );

    config.addValidator(TextAnalyzerValidator);

    config.addLabel('Planned date', {
      'nl': 'Desknet datum'
    });

    config.addLabel('Characters', {
      'nl': 'Tekens'
    });

    config.addLabel('characters', {
      'nl': 'tekens'
    });

    config.addLabel('Words', {
      'nl': 'Woorden'
    });

    config.addLabel('Document', {
      'nl': 'Document'
    });

    config.addLabel('Not enough characters', {
      'nl': 'Niet genoeg karakters'
    });

    // config.addLabel('Not enough characters', {
    //   'nl': 'Niet genoeg karakters'
    // })

    config.addLabel('Too many characters', {
      'nl': 'Te veel karakters'
    });

    config.addLabel('Information', {
      'nl': 'Informatie'
    });
  }
}
