import {BlockNode} from 'substance'

class HtmlEmbedNode extends BlockNode {
}

HtmlEmbedNode.define({
  type: 'htmlembed',
  id: {type: 'string'},
  dataType: 'string',
  format: 'string',
  text: {type: 'string', optional: true}
})

export default HtmlEmbedNode
