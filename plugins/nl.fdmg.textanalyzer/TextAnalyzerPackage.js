import TextAnalyzerComponent from './TextAnalyzerComponent'

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
    )

    config.addLabel('Planned date', {
      'nl': 'Desknet datum'
    })

    config.addLabel('Characters', {
      'nl': 'Karakters'
    })

    config.addLabel('characters', {
      'nl': 'karakters'
    })

    config.addLabel('Words', {
      'nl': 'Woorden'
    })

    config.addLabel('Document', {
      'nl': 'Document'
    })

    config.addLabel('Not enough characters', {
      'nl': 'Niet genoeg karakters'
    })

    // config.addLabel('Not enough characters', {
    //   'nl': 'Niet genoeg karakters'
    // })

    config.addLabel('Too many characters', {
      'nl': 'Te veel karakters'
    })
  }
}
