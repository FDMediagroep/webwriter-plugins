import HeartbeatComponent from './HeartbeatComponent';

export default {
  name: 'heartbeat',
  id: 'nl.fdmg.heartbeat',
  configure: function (config) {
    config.addPopover(
      this.name,
      {
        icon: 'fa-unlock-alt',
        align: 'left'
      },
      HeartbeatComponent
    );

    config.addLabel('No heartbeat', { nl: 'Geen heartbeat' });
    config.addLabel('Article unlocked', { nl: 'Artikel vrij' });
    config.addLabel('Article is new.', { nl: 'Nieuw artikel.' });
    config.addLabel('New article', { nl: 'Nieuw artikel.' });
    config.addLabel('Heartbeat endpoint is unreachable. Article is or will become unlocked in less than 70 seconds.', {
      nl: 'Heartbeat endpoint is onbereikbaar. Artikel is of zal vrij komen in minder dan 70 seconden.'
    });
    config.addLabel('Unknown error. Article is or will become unlocked in less than 70 seconds.', {
      nl: 'Onbekende fout. Artikel is of zal vrij komen in minder dan 70 seconden.'
    });
    config.addLabel('The version of the article on the server is newer than your version. Please hit F5 to reload the version from server. Your unsaved changes will be lost.', {
      nl: 'Artikel versie op de server is nieuwer dan uw versie. Toets F5 in om de laatste versie van de server op te halen. Al uw onopgeslagen veranderingen zullen verloren gaan.'
    });
    config.addLabel('Article locked', { nl: 'Artikel in gebruik' });
    config.addLabel('In use by', { nl: 'In gebruik door' });
    config.addLabel('This article is in use by', { nl: 'Dit artikel is in gebruik door' });
    config.addLabel('Article editable', { nl: 'Artikel vrij' });
    config.addLabel('You can edit this article', { nl: 'U mag dit artikel bewerken' });

  }
}
