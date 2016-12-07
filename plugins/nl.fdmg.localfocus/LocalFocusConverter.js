export default {
  type: 'localfocus',
  tagName: 'object',

  matchElement: function(el) {
    return el.is('object[type="fdmg/localfocus"]')
  },

  import: function(el, node) {
    node.dataType = el.attr('type')
    node.url = el.attr('url')
  },

  export: function(node, el) {
    el.attr({
      type: node.dataType,
      url: node.url
    })
  }
}
