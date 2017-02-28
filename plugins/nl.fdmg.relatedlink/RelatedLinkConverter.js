export default {
  type: 'relatedlink',
  tagName: 'object',

  matchElement: function(el) {
    return el.is('object') && el.attr('type') === 'fdmg/relatedlink';
  },

  import: function(el, node) { // jshint ignore:line
    if (el.attr('uuid')) {
      node.uuid = el.attr('uuid');
    }

    node.id = el.attr('id');

    node.contentType = el.attr('type');

    const dataEl = el.find('data');
    dataEl.children.forEach(function(child) {
      if (child.tagName === 'prefix') {
        node.prefix = child.text();
      }

      if (child.tagName === 'leadtext') {
        node.leadtext = child.text();
      }

      if (child.tagName === 'relatedurl') {
        node.relatedurl = child.text();
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
        converter.$$('prefix').append(
          converter.annotatedText([node.id, 'prefix'])
        ),
        converter.$$('leadtext').append(
          converter.annotatedText([node.id, 'leadtext'])
        ),
        converter.$$('relatedurl').append(
          converter.annotatedText([node.id, 'relatedurl'])
        )]
      )
    );
  }

}
