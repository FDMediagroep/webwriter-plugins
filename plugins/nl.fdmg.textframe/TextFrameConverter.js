export default {
  type: 'textframe',
  tagName: 'object',

  matchElement: function (el) {
    return el.is('object') && el.attr('type') === 'fdmg/textframe';
  },

  import: function (el, node, converter) { // jshint ignore:line
    // x-im/image attributes
    node.title = el.attr('title');
    node.dataType = el.attr('type');

    var linkEl = el.find('links>link');
    if (linkEl) {
      node.uri = linkEl.attr('uri');
      node.url = "";
      node.uuid = linkEl.attr('uuid');
      node.imageType = linkEl.attr('type');
    }

    // Import data
    var dataEl = el.find('data');
    node.crops = {};
    node.alignment = '';

    if (dataEl) {
      dataEl.children.forEach(function(child) {
        if (child.tagName === 'text') {
          node.text = converter.annotatedText(child, [node.id, 'text']);
        }

        if (child.tagName === 'subject') {
          node.subject = converter.annotatedText(child, [node.id, 'subject']);
        }

        if (child.tagName === 'width') {
          node.width = parseInt(child.text(), 10);
        }

        if (child.tagName === 'alignment') {
          node.alignment = child.text();
        }

        if (child.tagName === 'height') {
          node.height = parseInt(child.text(), 10);
        }

        if (child.tagName === 'crops') {
          var crops = {crops: []};

          child.children.forEach(function(crop) {
            if (crop.tagName === 'width') {
              crops.width = crop.text();
            }
            else if (crop.tagName === 'height') {
              crops.height = crop.text();
            }
            else {
              var x = crop.find('x'),
                y = crop.find('y'),
                width = crop.find('width'),
                height = crop.find('height');

              crops.crops.push({
                name: crop.attr('name'),
                x: x.text(),
                y: y.text(),
                width: width.text(),
                height: height.text()
              });
            }
          });

          if (child.attr('rel') === 'published') {
            node.crops.published = crops;
          }
          else if (child.attr('rel') === 'original') {
            node.crops.original = crops;
          }
        }

      });
    }
  },

  export: function (node, el, converter) {
    var $$ = converter.$$;

    el.removeAttr('data-id');
    el.attr({
      id: node.id,
      type: 'fdmg/textframe'
    });

    if(node.title) {
      el.attr('title', node.title);
    }

    // Data element
    var data = $$('data');
    if (node.text) {
      data.append($$('text').append(
        converter.annotatedText([node.id, 'text'])
      ));
    }

    if (node.subject) {
      data.append($$('subject').append(
        converter.annotatedText([node.id, 'subject'])
      ));
    }

    var fields = converter.pluginManager.api.getConfigValue('textframe', 'fields');
    fields.forEach(obj => {
      let name = (obj.name === 'caption' ? 'text' : obj.name)

      if (obj.type === 'option') {
        data.append(
          $$(name).append(node[obj.name])
        );
      }
      else {
        data.append(
          $$(name).append(
            converter.annotatedText([node.id, obj.name])
          )
        );
      }
    });

    // Add crops to data
    var crops = [];
    if (node.crops && node.crops.original) {
      var originalCrops = $$('crops').attr('rel', 'original');

      for (var x in node.crops.original.crops) {
        if(node.crops.original.crops.hasOwnProperty(x)) {
          var origCrop = node.crops.original.crops[x];

          originalCrops.append(
            $$('crop').attr('name', origCrop.name).append([
              $$('x').append(origCrop.x),
              $$('y').append(origCrop.y),
              $$('width').append(origCrop.width),
              $$('height').append(origCrop.height)
            ])
          );
        }
      }

      crops.push(originalCrops);
    }

    if (node.crops && node.crops.published) {
      var publishedCrops = $$('crops').attr('rel', 'published').append([
        $$('width').append(node.crops.published.width),
        $$('height').append(node.crops.published.height)
      ]);

      for (var y in node.crops.published.crops) {
        if(node.crops.published.crops.hasOwnProperty(y)) {
          var pubCrop = node.crops.published.crops[y];

          publishedCrops.append(
            $$('crop').attr('name', pubCrop.name).append([
              $$('x').append(pubCrop.x),
              $$('y').append(pubCrop.y),
              $$('width').append(pubCrop.width),
              $$('height').append(pubCrop.height)
            ])
          );
        }
      }

      crops.push(publishedCrops);
    }

    if (crops.length) {
      data.append(crops);
    }

    // Links
    if (node.uuid !== '' && node.uri) {
      var link = $$('link').attr({
        rel: 'image',
        type: 'x-im/image',
        uri: node.uri,
        uuid: node.uuid
      });

      el.append($$('links').append(link));
    }

    el.append(data);

  }

}
