export default {
  type: 'stackframe',
  tagName: 'object',

  matchElement: function(el) {
    return el.is('object') && el.attr('type') === 'fdmg/stackframe';
  },

  import: function(el, node) { // jshint ignore:line
    if (el.attr('uuid')) {
      node.uuid = el.attr('uuid');
    }

    node.id = el.attr('id');

    node.contentType = el.attr('type');

    var dataEl = el.find('data');
    dataEl.children.forEach(function(child) {
      if (child.tagName === 'heading') {
        node.heading = child.text();
      }

      if (child.tagName === 'content') {
        node.content = child.text();
      }
    });
  },

  export: function(node, el, converter) {
    if (node.uuid) {
      el.attr('uuid', node.uuid);
    }

    el.attr('type', node.contentType);
    el.attr('id', node.id);
    el.removeAttr('data-id');

    el.append(
      converter.$$('data').append([
        converter.$$('heading').append(
          converter.annotatedText([node.id, 'heading'])
        ),
        converter.$$('content').append(
          converter.annotatedText([node.id, 'content'])
        )]
      )
    );
  }

}
