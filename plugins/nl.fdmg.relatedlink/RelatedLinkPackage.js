import './scss/relatedlink.scss'
import RelatedLinkCommand from './RelatedLinkCommand';
import RelatedLinkComponent from './RelatedLinkComponent';
import RelatedLinkConverter from './RelatedLinkConverter';
import RelatedLinkNode from './RelatedLinkNode';
import RelatedLinkTool from './RelatedLinkTool';

export default {
  id: 'nl.fdmg.relatedlink',
  name: 'relatedlink',
  configure: function (config) {
    config.addNode(RelatedLinkNode);
    config.addConverter('newsml', RelatedLinkConverter);
    config.addComponent('relatedlink', RelatedLinkComponent);
    config.addCommand('relatedlink', RelatedLinkCommand, {nodeType: 'relatedlink'});
    config.addContentMenuTopTool('relatedlink', RelatedLinkTool);
    config.addIcon('relatedlink', {'fontawesome': 'fa-angle-right'});
    config.addLabel('relatedlink', {
      en: 'Add related link',
      nl: 'Gerelateerd link toevoegen'
    });
  }
}