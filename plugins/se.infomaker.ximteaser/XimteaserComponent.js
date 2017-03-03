import {Component, TextPropertyEditor, FontAwesomeIcon, documentHelpers} from 'substance';
import {api} from 'writer';

import ImageSearchDialog from '../nl.fdmg.imagesearch/ImageSearchDialog';
const pluginId = 'nl.fdmg.imagesearch';

class XimteaserComponent extends Component {

  didMount() {
    this.context.editorSession.onRender('document', this._onDocumentChange, this);

    // @TODO, how to prevent drag correctly??
    this.parent.parent.attr('draggable', false);
    this.parent.attr('draggable', false);
    this.attr('draggable', false);

  }

  dispose() {
    this.context.editorSession.off(this);
  }

  _onDocumentChange(change) {
    if (change.isAffected(this.props.node.id) ||
      change.isAffected(this.props.node.imageFile)) {
      this.rerender();
    }
  }

  render($$) {
    const node = this.props.node;
    const el = $$('div').addClass('sc-ximteaser im-blocknode__container');
    const teaserFields = api.getConfigValue('se.infomaker.ximteaser', 'fields', []);
    const ImageDisplay = api.ui.getComponent('imageDisplay');

    el.append(this.renderHeader($$));

    if (this.props.node.imageFile) {
      el.append(
        $$(ImageDisplay, { // Pass property to images if used in teaser and if drag should be disabled
          parentId: 'se.infomaker.ximteaser',
          node: node,
          isolatedNodeState: this.props.isolatedNodeState,
          removeImage: this.removeImage.bind(this)
        }).ref('image')
      )
    }
    el.append(this.renderContent($$, teaserFields));

    return el
  }

  /**
   * Remove reference to fileNode from teaser node
   * Set subject property on teaser to null
   */
  removeImage() {

    api.editorSession.transaction((tx) => {
      const node = this.props.node;
      tx.set([node.id, 'imageFile'], null);
      tx.set([node.id, 'subject'], '');
      // tx.delete(node.imageFile)
    })
  }

  /**
   * Render component header with icon
   * @param $$
   * @returns {*}
   */

  renderHeader($$) {
    return $$('div')
      .append([
        $$(FontAwesomeIcon, {icon: 'fa-newspaper-o'}),
        $$('strong').append(this.getLabel('Teaser')),
        $$('button').addClass('inline-plugin-button')
         .append(
           $$('i').addClass('fa fa-picture-o'))
          .attr('title', this.getLabel('Add/search image'))
           .on('click', () => {
             api.ui.showDialog(
               ImageSearchDialog, {
                 loadNextScrollThreshold: api.getConfigValue(pluginId, 'loadNextScrollThreshold', 100),
                 insertImageFromUrlCommand: 'insert-image-from-url',
                 insertImageCommand: 'ximteaserinsertimage',
                 pluginNode: this.props.node,
               }, {
                 primary: false,
                 center: true,
                 title: 'Image search'
               }
             )
           })
      ])
      .addClass('header');
  }


  triggerFileUpload(ev) {
    const editorSession = api.editorSession;
    editorSession.executeCommand('ximteaserinsertimage', {
      type: 'file',
      data: ev.target.files,
      context: {node: this.props.node}
    });
  }

  /**
   * Render content and all text property editors
   * @param $$
   * @param teaserFields
   * @returns {*}
   */

  renderContent($$, teaserFields) {
    const content = $$('div')
        .addClass('im-blocknode__content full-width');

    // If 'subject' is specified in the config it should be rendered
    if (teaserFields.indexOf('subject') >= 0) {
      content.append(this.renderSubjectEditor($$));
    }

    // Render title editor
    content.append(this.renderTitleEditor($$));

    // If 'text' is specified in the config it should be rendered
    if (teaserFields.indexOf('text') >= 0) {
      content.append(this.renderTextEditor($$));
    }

    return content;
  }


  /**
   * Render text editor for subject if an image exist
   * @param $$
   * @returns {?Component}
   */
  renderSubjectEditor($$) {
    if (this.props.node.imageFile) {
      const subjectContainer = $$('div');
      const subjectEditor = $$(TextPropertyEditor, {
        tagName: 'div',
        path: [this.props.node.id, 'subject'],
        doc: this.props.doc
      }).ref('subject').addClass('x-im-teaser-subject');
      const icon = $$(FontAwesomeIcon, {icon: 'fa-flag'});

      subjectContainer.append([icon, subjectEditor]);
      return subjectContainer;
    }
  }

  renderTitleEditor($$) {
    const titleContainer = $$('div');
    const titleEditor = $$(TextPropertyEditor, {
      tagName: 'div',
      path: [this.props.node.id, 'title'],
      doc: this.props.doc
    }).ref('title').addClass('x-im-teaser-title');

    const icon = $$(FontAwesomeIcon, {icon: 'fa-header'});

    titleContainer.append([icon, titleEditor]);
    return titleContainer;
  }

  renderTextEditor($$) {
    const textContainer = $$('div');
    const textEditor = $$(TextPropertyEditor, {
      tagName: 'div',
      path: [this.props.node.id, 'text'],
      doc: this.props.doc
    }).ref('text').addClass('x-im-teaser-text');

    const icon = $$(FontAwesomeIcon, {icon: 'fa-paragraph'});

    textContainer.append([icon, textEditor]);
    return textContainer;
  }

  /* Custom dropzone protocol */
  getDropzoneSpecs() {
    const label = this.props.node.imageFile ? 'teaser-replace-image' : 'teaser-add-image';
    return [
      {
        component: this,
        message: this.getLabel(label),
        dropParams: {
          action: 'replace-image',
          nodeId: this.props.node.id,
        }
      }
    ]
  }

  handleDrop(tx, dragState) {
    // TODO: it would be nice to execute a command in the
    // drop implementation, like so:
    // editorSession.executeCommand('ximteaserinsertimage', {
    //     type: 'file',
    //     data: dragState.data.files,
    //     context: {node: this.props.node}
    // });

    // HACK: so this should not be done here -> see command
    if (this.isFileDrop(dragState.data)) {
      // Handle file drop
      this.handleNewImage(tx, dragState);

      //Handle URI drop
    } else if (dragState.nodeDrag) {
      // Handle internal node drag
      this.handleNodeDrop(tx, dragState)
    } else if (this.isUriDrop(dragState.data)) {
      const uri = dragState.data.uris[0];
      const dropData = this.getDataFromURL(uri);
      this.handleUriDrop(tx, dropData)
    }

  }

  getDataFromURL(url) {
    const queryParamKey = 'data=';
    const dataPosition = url.indexOf(queryParamKey);
    let encodedData = url.substr(dataPosition + queryParamKey.length, url.length);
    return JSON.parse(window.atob(encodedData))
  }

  /**
   * This handles drops of nodes of type ximimage.
   * It retrieves the imageNode and extracts that fileNode and make a copy of it
   * The crops is removed, uri is changed to used to one from the ImageNode
   * The imageFile.id
   * @param tx
   * @param dragState
   */
  handleNodeDrop(tx, dragState) {
    const teaserNode = this.props.node;
    if (dragState.sourceSelection) {
      try {
        const draggedNodeId = dragState.sourceSelection.nodeId;
        const doc = this.context.editorSession.getDocument();
        const draggedNode = doc.get(draggedNodeId);
        if (draggedNode && draggedNode.type === 'ximimage') {
          const imageFile = draggedNode.imageFile;
          const imageNode = doc.get(imageFile);
          const newFileNode = documentHelpers.copyNode(imageNode)[0];
          newFileNode.parentNodeId = teaserNode.id;
          delete newFileNode.id;
          let imageFileNode = tx.create(newFileNode);
          tx.set([teaserNode.id, 'imageFile'], imageFileNode.id);
          tx.set([teaserNode.id, 'uri'], draggedNode.uri);
          tx.set([teaserNode.id, 'crops'], [])
        }
      } catch (_) {

      }

    }
  }

  handleUriDrop(tx, dropData) {
    this.shouldDownloadMetadataForImageUri = true;
    // Fetch the image
    const uuid = dropData.uuid;
    const nodeId = writer.idGenerator();
    const teaserNode = this.props.node;

    if (!dropData.uuid) {
      throw new Error('Unsupported data. UUID must exist')
    }

    const imageFileNode = {
      parentNodeId: nodeId,
      type: 'npfile',
      imType: 'x-im/image',
      uuid: uuid,
      sourceUUID: uuid,
    };

    // Create file node for the image
    let imageFile = tx.create(imageFileNode);

    tx.set([teaserNode.id, 'imageFile'], imageFile.id)

  }

  /**
   * This method is used when a file is dropped on top of the teaser
   * It will create a fileNode and update the teasernode with
   * the filenode property, all done in a provided transaction
   * @param tx
   * @param dragState
   */
  handleNewImage(tx, dragState) {
    const file = dragState.data.files[0];// Teaser only supports one image, take the first one
    const teaserNode = this.props.node;
    // TODO: we need to get the file instance through to the
    // real document
    let imageFile = tx.create({
      parentNodeId: teaserNode.id,
      type: 'npfile',
      imType: 'x-im/image',
      mimeType: file.type,
      sourceFile: file
    });

    tx.set([teaserNode.id, 'imageFile'], imageFile.id);
    // HACK: fileUpload will be done by CollabSession
    setTimeout(() => {
      this.context.editorSession.fileManager.sync()
    }, 300)
  }

  isFileDrop(dragData) {
    if (dragData.files && dragData.files.length > 0) {
      return true;
    }
    return false;
  }

  isUriDrop(dragData) {
    if (dragData.uris && dragData.uris.length > 0) {
      return true;
    }
    return false;
  }
}

export default XimteaserComponent;