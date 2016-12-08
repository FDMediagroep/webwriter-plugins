import './scss/relatedlink.scss'
import RelatedLinkCommand from './RelatedLinkCommand';
import RelatedLinkComponent from './RelatedLinkComponent';
import RelatedLinkConverter from './RelatedLinkConverter';
import RelatedLinkNode from './RelatedLinkNode';
import RelatedLinkTool from './RelatedLinkTool';
import RelatedLinkValidator from './RelatedLinkValidator.js';

export default {
  id: 'nl.fdmg.relatedlink',
  name: 'relatedlink',
  configure: function (config) {
    config.addNode(RelatedLinkNode);
    config.addConverter('newsml', RelatedLinkConverter);
    config.addComponent('relatedlink', RelatedLinkComponent);
    config.addCommand('relatedlink', RelatedLinkCommand, {nodeType: 'relatedlink'});
    config.addValidator(RelatedLinkValidator);
    config.addContentMenuTopTool('relatedlink', RelatedLinkTool);
    config.addIcon('relatedlink', {'fontawesome': 'fa-angle-right'});
    config.addLabel('Related article', { nl: 'Uitstapmoment' });
    config.addLabel('Also read', { nl: 'Lees ook' });
    config.addLabel('Article title', { nl: 'Titel van artikel' });

    config.addLabel('No relatedlink prefix', { nl: 'Een of meerdere uitstapmomenten heeft geen voorvoegsel' });
    config.addLabel('No relatedlink leadtext', { nl: 'Een of meerdere uitstapmomenten heeft geen tekst' });
    config.addLabel('No relatedlink relatedurl', { nl: 'Gerelateerd artikel url niet valide' });
  }
}