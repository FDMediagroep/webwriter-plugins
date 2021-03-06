export default {
  type: 'quote',
  tagName: 'object',

  matchElement: function (el) {
    return el.is('object') && el.attr('type') === 'fdmg/quote';
  },

  import: function (el, node) { // jshint ignore:line
    if (el.attr('uuid')) {
      node.uuid = el.attr('uuid');
    }

    node.id = el.attr('id');

    node.contentType = el.attr('type');

    var dataEl = el.find('data');
    dataEl.children.forEach(function (child) {
      if (child.tagName === 'message') {
        node.message = child.text();
      }

      if (child.tagName === 'author') {
        node.author = child.text();
      }
    });
  },

  export: function (node, el, converter) {
    if (node.uuid) {
      el.attr('uuid', node.uuid);
    }

    el.attr('type', node.contentType);
    el.attr('id', node.id);
    el.removeAttr('data-id');

    el.append(
      converter.$$('data').append([
        converter.$$('message').append(
          converter.annotatedText([node.id, 'message'])
        ),
        converter.$$('author').append(
          converter.annotatedText([node.id, 'author'])
        )]
      )
    );
  }
}