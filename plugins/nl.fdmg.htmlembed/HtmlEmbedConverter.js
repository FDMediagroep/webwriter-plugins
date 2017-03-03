export default {
  type: 'htmlembed',
  tagName: 'object',

  matchElement: (el) => {
    return el.is('object') && el.attr('type') === 'fdmg/htmlembed'
  },

  import: (el, node) => {
    if (el.attr('uuid')) {
      node.uuid = el.attr('uuid')
    }

    node.id = el.attr('id');

    node.dataType = el.attr('type');

    const dataEl = el.find('data');
    dataEl.children.forEach(child => {
      if (child.tagName === 'text') {
        node.text = child.text();
      }

      if (child.tagName === 'format') {
        node.format = child.text();
      }
    })
  },

  export: (node, el, converter) => {
    const $$ = converter.$$;

    if (node.uuid) {
      el.attr('uuid', node.uuid);
    }

    el.attr('type', node.dataType);
    el.attr('id', node.id);
    el.removeAttr('data-id');

    const data = $$('data');

    const text = $$('text');
    const html = '<![CDATA[' + node.text.replace(']]>', ']]&gt;') + ']]>';
    text.innerHTML = html;

    const format = $$('format');
    format.append(converter.annotatedText([node.id, 'format']));

    data.append([text, format]);
    el.append(data)
  }
}
