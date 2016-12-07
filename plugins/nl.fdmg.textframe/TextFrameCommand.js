import {Command} from 'substance';
import {lodash, idGenerator} from 'writer'


class Observer {
  constructor(command, nodeId) {
    this.command = command;
    this.nodeId = nodeId;
  }

  preview(data, context) {

    if (this.nodeId) {
      this.node = this.command.context.doc.get(this.nodeId);
      this.node.removeImage();
      this.node.setPreviewImage(data);
      this.replacement = true;
    } else {
      this.id = this.command.createPreviewNode(data, context);
      this.node = this.command.context.doc.get(this.id);
      this.replacement = false;
    }

    //this.node.setPreviewImage(data);
    this.node.preview();
  }

  progress(progress) {
    this.node.setProgress(progress > 90 ? 90 : progress);
  }

  done(data) {
    var dom = data.dom,
      imageUrl = data.imageUrl;

    var newsItem = dom.querySelector('newsItem'),
      uuid = newsItem.getAttribute('guid'),
      uri = dom.querySelector('itemMeta > itemMetaExtProperty[type="imext:uri"]');

    if (!imageUrl) {
      this.command.getUrlAndUpdateDocument(dom, this.node, this.replacement);
    } else {
      this.node.updateMetaData({
        uuid: uuid,
        uri:uri.attributes['value'].value,
        url:imageUrl,
        progress: 100
      });
    }
  }
}

export default class StackFrameCommand extends Command {
  constructor(config) {
    super(config);
    this.mimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/png'
    ];
  }

  getCommandState() {
    return {
      disabled: false
    };
  }

  execute(param, context) {

    // if (this.getCommandState().disabled) {
    //     return false;
    // }

    this.insertTextframe([], context);

    if (lodash.isString(param)) {
      // No handling of ordinary uri strings.
      return false;
    }

    if (!param.type || !param.context || !param.context.nodeId) {
      // "Unsupported drop information, something is missing among param.type [" + param.type + "], param.context [" + param.context + "]" ;
      // Ignore this drop
      return false;
    }

    switch (param.type) {
      case 'uri':
        this.handleUri(param.data, param.context.nodeId, context);
        break;
      case 'file':
        this.handleFiles(param.data, param.context.nodeId, context);
        break;
      case 'newsItem':
        this.handleNewsItem(param.data, param.context.nodeId, context);
        break;
      default:
        throw Error("XimimageCommand cannot handle drop of type: " + param.type);
    }

    return true;
  }

  handleUri(uri, nodeId, context) {
    context.api.uploadUri(uri, {allowedItemClasses: ['ninat:picture']},
      new Observer(this, nodeId));
  }

  handleNewsItem(newsItem, nodeId, context) {
    var observer = new Observer(this, nodeId);

    observer.preview(null, context);
    observer.progress(100);
    observer.done({dom: newsItem});
  }

  insertTextframe(files, context) {
    if (this.getCommandState().disabled) {
      return;
    }

    if (files && files.length) {
      this.handleFiles(files);
    }
    else {
      this.createEmptyNode(context);
    }
  }

  handleFile(file, nodeId, context) {
    context.api.uploadFile(file,
      {allowedItemClasses: ['ninat:picture'], allowedMimeTypes: this.mimeTypes},
      new Observer(this, nodeId));
  }

  handleFiles(files, nodeId, context) {
    if (!lodash.isArrayLike(files)) {
      this.handleFile(files, nodeId, context);
    } else {
      for (var i = 0; i < files.length; i++) {
        this.handleFile(files[i], nodeId, context);
      }
    }
  }

  createEmptyNode(context) {

    var data = {
      type: 'textframe',
      dataType: 'fdmg/textframe',
      id: idGenerator(),
      uuid: '',
      url: '',
      alignment: '',
      previewUrl: '',
      progress: 100,
      imageType: 'x-im/image',
      title: '',
      text: ''
    };

    return context.api.document.insertBlockNode(data.type, data);
  }

  createPreviewNode(data, context) {
    var newData = {
      type: 'textframe',
      dataType: 'fdmg/textframe',
      id: idGenerator(),
      uuid: '',
      url: '',
      alignment: '',
      previewUrl: data,
      progress: 0,
      imageType: 'x-im/image',
      title: '',
      text: ''
    };

    // Todo - move to api

    var surface = context.controller.getFocusedSurface();
    surface.transaction(function(tx) {
      var body = tx.get('body');
      var node = tx.create(newData);
      body.show(node.id);
    });

    //this.context.api.insertBlockNode(data.type, data);
    return newData.id;
  }


  getUrlAndUpdateDocument(dom, node, replacement) {
    var newsItem = dom.querySelector('newsItem'),
      uri = dom.querySelector('itemMeta > itemMetaExtProperty[type="imext:uri"]');

    var uuid = newsItem.getAttribute('guid');

    this.context.api.router.get('/api/image/url/' + uuid + '/450')
    .done(function(url) {
      if (replacement) {
        node.setImage(
          uuid,
          uri ? uri.attributes['value'].value : '',
          url
        );
      }
      else {
        node.setInitialMetaData(
          uuid,
          uri ? uri.attributes['value'].value : '',
          url
        );
      }
    })
    .error(function(error, xhr, text) {
      // TODO: Display error message
      console.error(error, xhr, text);
    });
  }

}
