import {BlockNode} from 'substance';

export default class StackFrameNode extends BlockNode {
}

StackFrameNode.define({
  type: 'stackframe',
  contentType: 'string',
  heading: 'string',
  content: 'string'
});
