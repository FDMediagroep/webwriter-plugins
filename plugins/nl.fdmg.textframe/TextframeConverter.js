import { idGenerator } from 'writer'


export default {
  type: 'textframe',
  tagName: 'object',

  matchElement: function (el) {
    return el.is('object') && el.attr('type') === 'fdmg/textframe'
  },


  /**
   * Import textframe xml structure
   */
  import: function (el, node, converter) { // jshint ignore:line
    const nodeId = el.attr('id')
    node.title = el.attr('title')
    node.dataType = el.attr('type')

      // Import textframe data
    const dataEl = el.find('data')
    if (dataEl) {
      dataEl.children.forEach(function(child) {
        if (child.tagName === 'text') {
          node.text = converter.annotatedText(child, [node.id, 'text'])
        }

        if (child.tagName === 'subject') {
          node.subject = converter.annotatedText(child, [node.id, 'subject'])
        }

      })
    }

      // Handle image link in textframe
    const linkEl = el.find('links > link')
    if (linkEl) {
      node.imageType = linkEl.attr('type')

      let imageFile = {
        id: idGenerator(),
        type: 'npfile',
        imType: 'x-im/image',
        parentNodeId:nodeId
      }

      if (linkEl.attr('uuid')) {
        imageFile.uuid = linkEl.attr('uuid')
      }

      if (linkEl.attr('uri')) {
        node.uri = linkEl.attr('uri')
      }

      if (linkEl.attr('url')) {
        imageFile.url = linkEl.attr('url')
      }

      // If image data like width, height, crops is not found here it's
      // the old depcrecated format with image data in the textframe data.
      const linkDataEl = linkEl.find('data')
      if (linkDataEl) {
        // New format, image data is found correctly in link data element
        this.importImageLinkData(linkDataEl, node)
      }
      else {
          // Old, depcrecated format, image data is found in textframe data
        this.importImageLinkData(dataEl, node)
      }

      converter.createNode(imageFile)
      node.imageFile = imageFile.id
      node.uuid = linkEl.attr('uuid')
    }
  },

  /**
   * Import the image link structure
   */
  importImageLinkData: function(el, node) {
    el.children.forEach(function(child) {
      if (child.tagName === 'width') {
        node.width = parseInt(child.text(), 10)
      }

      if (child.tagName === 'height') {
        node.height = parseInt(child.text(), 10)
      }

      if (child.tagName === 'crops' && child.children.length > 0) {
        let crops = {
          crops: []
        }

        child.children.forEach(function(crop) {
          if (crop.children.length === 0) {
            return
          }

          if (crop.tagName === 'width') {
            crops.width = crop.text()
          }
          else if (crop.tagName === 'height') {
            crops.height = crop.text()
          }
          else {
            var x = crop.find('x'),
              y = crop.find('y'),
              width = crop.find('width'),
              height = crop.find('height')

            crops.crops.push({
              name: crop.attr('name'),
              x: x.text(),
              y: y.text(),
              width: width.text(),
              height: height.text()
            })
          }
        })

        if (crops.crops.length) {
          node.crops = crops
        }
      }
    })
  },

  /**
   * Export textframe in the following format:
   *
   * <object id="mb2" type="fdmg/textframe" title="50-åring häktad för barnporrbrott">
   *   <data>
   *     <text>
   *       En man i 50-årsåldern som är anställd på en skola i Västerås häktades i dag på sannolika skäl
   *       misstänkt för utnyttjande av barn för sexuell posering, sexuellt ofredande och
   *       barnpornografibrott, rapporterar P4 Västmanland. Brotten omfattar sammanlagt fe
   *     </text>
   *     <subject>hnjnjnjnj</subject>
   *   </data>
   *   <links>
   *     <link rel="image" type="x-im/image" uri="im://image/oaVeImm6yCsoihzsKNAuFUAsOpY.jpg" uuid="631c8997-36c8-5d0d-9acd-68cc1856f87c">
   *       <data>
   *         <width></width>
   *         <height></height>
   *         <crops>...</crops>
   *       </data>
   *     </link>
   *   </links>
   * </object>
   *
   * @param el
   * @param node
   * @param converter
   */

  export: function (node, el, converter) {
    const $$ = converter.$$

    el.removeAttr('data-id')
    el.attr({
      id: node.id,
      type: 'fdmg/textframe'
    })

    if(node.title) {
      el.attr('title', converter.annotatedText([node.id, 'title']))
    }

    // Data element
    const data = $$('data')
    if (node.text) {
      data.append($$('text').append(
        converter.annotatedText([node.id, 'text'])
      ))
    }

    if (node.subject) {
      data.append($$('subject').append(
        converter.annotatedText([node.id, 'subject'])
      ))
    }
    el.append(data)

    let fileNode = node.document.get(node.imageFile)

    // Links
    if (fileNode && fileNode.uuid !== '' && node.uri) {
      const link = $$('link').attr({
        rel: 'image',
        type: 'x-im/image',
        uri: node.uri,
        uuid: fileNode.uuid
      })
      const linkData = $$('data')

        // Add image data and crops to data
      if(node.width) {
        linkData.append(
          $$('width').append(
            String(node.width)
          )
        )
      }
      if(node.height) {
        linkData.append(
        $$('height').append(
            String(node.height)
          )
        )
      }

      if (node.crops) {
        let crops = $$('crops')

            for (var x in node.crops.crops) { // eslint-disable-line
              var origCrop = node.crops.crops[x]

              crops.append(
                $$('crop').attr('name', origCrop.name).append([
                  $$('x').append(origCrop.x),
                  $$('y').append(origCrop.y),
                  $$('width').append(origCrop.width),
                  $$('height').append(origCrop.height)
                ])
              )
            }

        linkData.append(crops)
        link.append(linkData)
      }

      el.append(
        $$('links').append(link)
      )
    }

  }
}
