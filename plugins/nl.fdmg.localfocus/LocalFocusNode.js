import { BlockNode } from 'substance';

class LocalFocusNode extends BlockNode {}

LocalFocusNode.define({
  type: 'localfocus',
  dataType: 'string',
  url: 'string'
});

export default LocalFocusNode;