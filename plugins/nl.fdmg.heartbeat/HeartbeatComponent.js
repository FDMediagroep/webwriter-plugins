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

    console.info(api.newsItem, api);
    api.events.on(pluginId, event.DOCUMENT_CHANGED, () => {
      if(pollInterval === undefined) {
        // Change state
        this.extendState({
          heartbeat: {
            name: 'The name of the current user',
            articleId: api.newsItem.getIdForArticle()
          }
        });

        this.poll();
        pollInterval = setInterval(this.poll, 60000);
      } else {
        this._updatePresentation();
      }
    })

  }

  poll() {
    const token = api.getConfigValue(pluginId, 'token');
    const url = api.getConfigValue(pluginId, 'endpoint');
    api.router.post('/api/resourceproxy', {
      url: url,
      body: JSON.stringify(this.state),
      headers: {
        'x-access-token': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => api.router.checkForOKStatus(response))
    .then(response => response.json())
    .then((json) => {
      console.info(json);
      this._updatePresentation();
    })
    .catch((err) => {
      console.warn(err);
      this.extendState({
        heartbeat: {
          lockedBy: 'System'
        }
      });
      this._updatePresentation();
    })
  }

  getInitialState() {
    this.extendState({
      heartbeat: {
        name: null,
        lockedBy: '',
        articleId: api.newsItem.getIdForArticle()
      }
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

  _updatePresentation() {
    let locked = false;
    if(this.state.heartbeat.lockedBy !== null && this.state.heartbeat.lockedBy === 'System') {
      locked = false;
      this.setLockedBySystem();
    } else if (this.state.heartbeat.lockedBy !== null && this.state.heartbeat.lockedBy !== 'The name of the current user') {
      locked = true;
      this.setLockedByUser();
    } else {
      this.setUnlocked();
    }

    this.lockMenu(locked);
  }

  /**
   * Set UI to reflect status where Heartbeat endpoint is unreachable.
   */
  setLockedBySystem() {
    // Heartbeat endpoint unreachable.
    //api.ui.showNotification('Article unlocked', this.getLabel('Article unlocked'), this.getLabel('Heartbeat endpoint is unreachable. Article is or will become unlocked in less than 70 seconds.'));
    this.props.popover.setStatusText(this.getLabel('No heartbeat'));
    this.props.popover.setIcon('fa-heartbeat');
    el = virtualElement('div').addClass('fdmg-heartbeat').append(
      virtualElement('h2').append(this.getLabel('Article unlocked'))
    ).append(
      virtualElement('p').append(this.getLabel('Heartbeat endpoint is unreachable. Article is or will become unlocked in less than 70 seconds.'))
    );
  }
  /**
   * Set UI to reflect status where article is locked by another user.
   */
  setLockedByUser() {
    // Article is locked by user
    api.ui.showNotification('Article locked', this.getLabel('Article locked'), this.getLabel('This article is in use by') + ': ' + this.state.heartbeat.lockedBy);
    this.props.popover.setStatusText(this.getLabel('In use by') + ' ' + this.state.heartbeat.lockedBy);
    this.props.popover.setIcon('fa-lock');
    el = virtualElement('div').addClass('fdmg-heartbeat').append(
      virtualElement('h2').append(this.getLabel('Article locked'))
    ).append(
      virtualElement('p').append(this.getLabel('This article is in use by') + ': ' + this.state.heartbeat.lockedBy)
    );
  }
  /**
   * Set UI to reflect status where article is not locked.
   */
  setUnlocked() {
    // Article is not locked
    this.props.popover.setStatusText('');
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
