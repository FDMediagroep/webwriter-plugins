import {BlockNode} from 'substance';

export default class QuoteNode extends BlockNode {
}

QuoteNode.define({
  type: 'quote',
  contentType: 'string',
  message: 'string',
  author: 'string'
});
