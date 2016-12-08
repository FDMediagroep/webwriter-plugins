import {BlockNode} from 'substance';

export default class NumberFrameNode extends BlockNode {
}

NumberFrameNode.define({
  type: 'numberframe',
  contentType: 'string',
  heading: 'string',
  content: 'string'
});
