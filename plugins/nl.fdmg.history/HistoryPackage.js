import './scss/history.scss'

import HistoryMainComponent from './HistoryMainComponent'

export default({
  id: 'nl.fdmg.history',
  name: 'history',
  configure: function(config) {
    // config.addComponentToSidebarWithTabId('historyagentcomponent', 'main', HistoryAgentComponent)

    config.addLabel('history-popover-headline', {
      'nl': 'Recente wijzigingen',
      'en': 'Changes since last successful save'
    });

    config.addLabel('history-popover-description', {
      'nl': 'Selecteer een eerdere versie van uw artikel',
      'en': 'Changes since last successful save'
    });

    config.addLabel('Unsaved articles found', {
      'nl': 'Niet opgeslagen artikelversies'
    });
    config.addLabel('Continue with last saved version', {
      'nl': 'Doorgaan met laatst opgeslagen versie'
    });
    config.addLabel('We found some unsaved changes for this article.', {
      'nl': 'Selecteer een eerdere versie van je artikel'
    });
    config.addLabel('Unsaved changes found for this article', {
      'nl': 'Onopgeslagen wijzigingen gevonden voor dit artikel'
    });
    config.addLabel('See all other unsaved articles', {
      'nl': 'Bekijk alle overige onopgeslagen artikelen'
    });
    config.addLabel('Following unsaved articles found', {
      'nl': 'Volgende onopgeslagen artikelen gevonden'
    });
    config.addLabel('No thanks, create a new article', {
      'nl': 'Nee bedankt, maak een nieuw artikel'
    });
    config.addLabel('We\'ve found some unsaved articles. Click on the version you would like to restore', {
      'nl': 'We hebben een aantal onopgeslagen versies gevonden. Klik op de versie die u wilt herstellen.'
    });

    config.addLabel('Identical with the active version', {
      'nl': 'Identiek aan actieve versie'
    });

    config.addLabel('Ignore and clear history', {
      'nl': 'Negeren en historie verwijderen'
    });

    config.addPopover(
      'historymaincomponent',
      {
        icon: 'fa-history',
        align: 'right'
      },
      HistoryMainComponent
    )


  }
})
