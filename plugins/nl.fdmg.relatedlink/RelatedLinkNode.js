import {BlockNode} from 'substance';

export default class RelatedLinkNode extends BlockNode {
}

RelatedLinkNode.define({
  type: 'relatedlink',
  contentType: 'string',
  prefix: 'string',
  leadtext: 'string',
  relatedurl: 'string'
});
