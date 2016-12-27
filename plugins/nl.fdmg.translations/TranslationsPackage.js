/**
 * This plugin is created with the purpose of overriding translations of plugins created by other sources.
 * When we don't have access to change the translations in the plugins directly then we resort to this plugin.
 * Always prefer Merge Requests to the actual plugin rather than adding translations here.
 */
export default {
  id: 'nl.fdmg.translations',
  name: 'translations',
  configure: function (config) {
    config.addLabel('Insert Teaser', {
      'nl': 'Teaser invoegen'
    });

    config.addLabel('Insert PDF document', {
      'nl': 'PDF invoegen'
    });

    config.addLabel('headline.content', {
      nl: 'Titel'
    });
    config.addLabel('headline', {
      nl: 'Titel'
    });

    config.addLabel('preamble', {
      nl: 'Inleiding'
    });
    config.addLabel('preamble.content', {
      nl: 'Inleiding'
    });

    config.addLabel('subheadline', {
      nl: 'Subkop'
    })
    config.addLabel('subheadline.content', {
      nl: 'Subkop'
    })

    config.addLabel('paragraph', {
      nl: 'Paragraaf'
    })
    config.addLabel('paragraph.content', {
      nl: 'Paragraaf'
    })

    config.addLabel('A teaser already exist', {
      nl: 'Er bestaat al een teaser'
    })
    config.addLabel('There is already a teaser in this document', {
      nl: 'Er bestaat al een teaser in dit document'
    })

  }
}
