import './scss/heartbeat.scss'

const {Component} = substance
const {api, event} = writer
const pluginId = 'nl.fdmg.heartbeat'
let virtualElement;
let el;
let pollInterval;

export default class HeartbeatComponent extends Component {
  constructor(...args) {
    super(...args);

    api.events.on(pluginId, event.DOCUMENT_CHANGED, () => {
      let id = api.newsItem.getIdForArticle();
      if (id.indexOf('-') > -1) {
        id = id.substring(id.indexOf('-') + 1);
      }

      /**
       * Use the article version stored in the NewsML.
       */
      const articleVersions = api.newsItem.getLinkByType('articleverion', 'fdmg/articleversion');
      let value = 0;
      // There should only be one. But we use forEach anyway because it's so short to write.
      articleVersions.forEach((articleVersion) => {
        value = articleVersion['@value'];
      });

      // Change state
      this.extendState({ articleId: id, articleVersion: value });

      if(pollInterval === undefined) {
        this.poll();
        pollInterval = setInterval(() => this.poll(), 60000);
      } else {
        this.updatePresentation();
      }
    });

  }

  /**
   * Send heartbeat to server. When article is not locked by anyone else it is then locked by this user.
   */
  poll() {
    const token = api.getConfigValue(pluginId, 'token');
    const url = api.getConfigValue(pluginId, 'endpoint');
    // Promise.race allows multiple promises to run asynchronously and see who finishes first.
    Promise.race([
      api.router.put('/api/resourceproxy', {
        url: url + this.state.articleId,
        headers: {
          'x-access-token': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
      })
    ])
    .then(response => api.router.checkForOKStatus(response))
    .then(response => response.json())
    .then((json) => {
      this.extendState({
        lockedBy: json.lockedBy,
        serverVersion: json.articleVersion
      });
      this.updatePresentation();
    })
    .catch((err) => {
      console.warn(err.status, err);
      this.extendState({
        lockedBy: 'System',
        error: err
      });
      this.updatePresentation();
    })
  }


  getInitialState() {
    this.extendState({
      articleId: -1,
      locked: false,
      articleVersion: 0
    });
  }

  render($$) {
    virtualElement = $$;
    if(el === undefined) {
      el = virtualElement('div').addClass('fdmg-heartbeat').append(
        virtualElement('h2').append(this.getLabel('Article unlocked'))
      );
    }

    return el;
  }

  /**
   * Determine if article is locked or not and update the UI accordingly.
   */
  updatePresentation() {
    let locked = false;
    if(this.state.lockedBy !== null && this.state.lockedBy === 'System') {
      this.setLockedBySystem();
    } else if (this.state.locked !== null && this.state.locked) {
      locked = true;
      this.setLockedByUser();
    } else if(this.state.articleVersion !== this.state.serverVersion) {
      locked = true;
      this.setLockedByVersion()
    } else {
      this.setUnlocked();
    }
    this.lockMenu(locked);
  }

  /**
   * Set UI to reflect status where Heartbeat endpoint is unreachable.
   */
  setLockedBySystem() {
    let statusText = 'No heartbeat';
    let title = 'Article unlocked';
    let message = 'Unknown error. Article is or will become unlocked in less than 70 seconds.';
    // Heartbeat endpoint unreachable.
    if(!parseInt(this.state.articleVersion, 10)) {
      message = 'Article is new.';
      this.props.popover.setIcon('fa-unlock-alt');
    } else if(this.state.error.message === 'request timeout') {
      message = 'Heartbeat endpoint is unreachable. Article is or will become unlocked in less than 70 seconds.';
      api.ui.showNotification('Article unlocked', this.getLabel(title), this.getLabel(message));
      this.props.popover.setIcon('fa-heartbeat');
    }
    this.props.popover.setStatusText(this.getLabel(statusText));
    el = virtualElement('div').addClass('fdmg-heartbeat').append(
      virtualElement('h2').append(this.getLabel(title))
    ).append(
      virtualElement('p').append(this.getLabel(message))
    );
  }

  /**
   * Set UI to reflect status where article is locked by another user.
   */
  setLockedByUser() {
    // Article is locked by user
    api.ui.showNotification('Article locked', this.getLabel('Article locked'), this.getLabel('This article is in use by') + ': ' + this.state.lockedBy);
    this.props.popover.setStatusText(this.getLabel('In use by') + ' ' + this.state.lockedBy);
    this.props.popover.setIcon('fa-lock');
    el = virtualElement('div').addClass('fdmg-heartbeat').append(
      virtualElement('h2').append(this.getLabel('Article locked'))
    ).append(
      virtualElement('p').append(this.getLabel('This article is in use by') + ': ' + this.state.lockedBy)
    );
  }
  /**
   * Set UI to reflect status where article is locked because version on server is newer.
   */
  setLockedByVersion() {
    // Article is locked by version
    api.ui.showNotification('Article locked', this.getLabel('Article locked'), this.getLabel('The version of the article on the server is newer than your version. Please hit F5 to reload the version from server. Your unsaved changes will be lost.'));
    this.props.popover.setStatusText(this.getLabel('Obsolete version'));
    this.props.popover.setIcon('fa-lock');
    el = virtualElement('div').addClass('fdmg-heartbeat').append(
      virtualElement('h2').append(this.getLabel('Article locked'))
    ).append(
      virtualElement('p').append(this.getLabel('The version of the article on the server is newer than your version. Please hit F5 to reload the version from server. Your unsaved changes will be lost.'))
    );
  }
  /**
   * Set UI to reflect status where article is not locked.
   */
  setUnlocked() {
    // Article is not locked
    this.props.popover.setStatusText(this.getLabel('In use by') + ' ' + this.state.lockedBy);
    this.props.popover.setIcon('fa-unlock-alt');
    el = virtualElement('div').addClass('fdmg-heartbeat').append(
      virtualElement('h2').append(this.getLabel('Article editable'))
    ).append(
      virtualElement('p').append(this.getLabel('You can edit this article'))
    );
  }

  /**
   * Disable save/status button.
   * Add/remove locked class to menu bar.
   *
   * @param locked
   */
  lockMenu(locked) {
    const menuButtons = document.querySelectorAll('.sc-np-bar button');
    menuButtons.forEach(button => {
      if(locked) {
        button.setAttribute('disabled', 'disabled');
        document.querySelector('.sc-np-bar').classList.add('locked');
      } else {
        button.removeAttribute('disabled');
        document.querySelector('.sc-np-bar').classList.remove('locked');
      }
    });
  }
}
