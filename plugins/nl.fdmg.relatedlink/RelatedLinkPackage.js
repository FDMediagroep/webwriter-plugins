import './scss/relatedlink.scss'
import RelatedLinkCommand from './RelatedLinkCommand';
import RelatedLinkComponent from './RelatedLinkComponent';
import RelatedLinkConverter from './RelatedLinkConverter';
import RelatedLinkNode from './RelatedLinkNode';
import RelatedLinkTool from './RelatedLinkTool';
import Fd4validation from '../fd4validation/Fd4validation.js';

export default {
  id: 'nl.fdmg.relatedlink',
  name: 'relatedlink',
  configure: function (config) {
    config.addNode(RelatedLinkNode);
    config.addConverter('newsml', RelatedLinkConverter);
    config.addComponent('relatedlink', RelatedLinkComponent);
    config.addCommand('relatedlink', RelatedLinkCommand, {nodeType: 'relatedlink'});
    config.addValidator(Fd4validation);
    config.addContentMenuTopTool('relatedlink', RelatedLinkTool);
    config.addIcon('relatedlink', {'fontawesome': 'fa-angle-right'});
    config.addLabel('Related article', { nl: 'Uitstapmoment' });
    config.addLabel('Also read', { nl: 'Lees ook' });
    config.addLabel('Article title', { nl: 'Titel van artikel' });
  }
}