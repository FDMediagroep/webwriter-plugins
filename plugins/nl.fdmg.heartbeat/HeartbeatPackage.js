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

  }
}
