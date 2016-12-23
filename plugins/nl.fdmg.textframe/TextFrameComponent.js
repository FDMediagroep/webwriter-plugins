import {Component, TextPropertyEditor, FontAwesomeIcon} from 'substance'
import {api} from 'writer'
import ImageDisplay from './ImageDisplay'
import FileInputComponent from './FileInputComponent'

class TextframeComponent extends Component {

  didMount() {
    this.context.editorSession.onRender('document', this._onDocumentChange, this)

    // @TODO, how to prevent drag correctly??
    this.parent.parent.attr('draggable', false)
    this.parent.attr('draggable', false)
    this.attr('draggable', false)

  }

  dispose() {
    this.context.editorSession.off(this)
  }

  _onDocumentChange(change) {
    if (change.isAffected(this.props.node.id) ||
      change.isAffected(this.props.node.imageFile)) {
      this.rerender()
    }
  }

  render($$) {
    const node = this.props.node
    const el = $$('div').addClass('sc-textframe im-blocknode__container')
    const textframeFields = api.getConfigValue('nl.fdmg.textframe', 'fields', [])

    el.append(this.renderHeader($$))

    if (this.props.node.imageFile) {
      el.append(
        $$(ImageDisplay, { // Pass property to images if used in textframe and if drag should be disabled
          parentId: 'nl.fdmg.textframe',
          node: node,
          isolatedNodeState: this.props.isolatedNodeState,
          removeImage: this.removeImage.bind(this)
        }).ref('image')
      )
    }
    el.append(this.renderContent($$, textframeFields))

    return el
  }

  /**
   * Remove reference to fileNode from textframe node
   * Set subject property on textframe to null
   */
  removeImage() {

    api.editorSession.transaction((tx) => {
      const node = this.props.node
      tx.set([node.id, 'imageFile'], null)
      tx.set([node.id, 'subject'], '')
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
        $$(FontAwesomeIcon, {icon: 'fa-list-alt'}),
        $$('strong').append(this.getLabel('Textframe')),
        $$(FileInputComponent, {onChange: this.triggerFileUpload.bind(this)})
      ])
      .addClass('header')
  }


  triggerFileUpload(ev) {
    const editorSession = api.editorSession
    editorSession.executeCommand('textframeinsertimage', {
      type: 'file',
      data: ev.target.files,
      context: {node: this.props.node}
    });
  }

  /**
   * Render content and all text property editors
   * @param $$
   * @param textframeFields
   * @returns {*}
   */

  renderContent($$, textframeFields) {
    const content = $$('div')
      .addClass('im-blocknode__content full-width')

    // If 'subject' is specified in the config it should be rendered
    if (textframeFields.indexOf('subject') >= 0) {
      content.append(this.renderSubjectEditor($$))
    }

    // Render title editor
    content.append(this.renderTitleEditor($$))

    // If 'text' is specified in the config it should be rendered
    if (textframeFields.indexOf('text') >= 0) {
      content.append(this.renderTextEditor($$))
    }

    return content
  }

  /**
   * Render text editor for subject if an image exist
   * @param $$
   * @returns {?Component}
   */
  renderSubjectEditor($$) {
    if (this.props.node.imageFile) {
      const subjectContainer = $$('div')
      const subjectEditor = $$(TextPropertyEditor, {
        tagName: 'div',
        path: [this.props.node.id, 'subject'],
        doc: this.props.doc
      }).ref('subject').addClass('x-im-teaser-subject')
      const icon = $$(FontAwesomeIcon, {icon: 'fa-flag'})

      subjectContainer.append([icon, subjectEditor])
      return subjectContainer
    }
  }

  renderTitleEditor($$) {
    const titleContainer = $$('div')
    const titleEditor = $$(TextPropertyEditor, {
      tagName: 'div',
      path: [this.props.node.id, 'title'],
      doc: this.props.doc
    }).ref('title').addClass('x-im-teaser-title')

    const icon = $$(FontAwesomeIcon, {icon: 'fa-header'})

    titleContainer.append([icon, titleEditor])
    return titleContainer
  }

  renderTextEditor($$) {
    const textContainer = $$('div')
    const textEditor = $$(TextPropertyEditor, {
      tagName: 'div',
      path: [this.props.node.id, 'text'],
      doc: this.props.doc
    }).ref('text').addClass('x-im-teaser-text')

    const icon = $$(FontAwesomeIcon, {icon: 'fa-paragraph'})

    textContainer.append([icon, textEditor])
    return textContainer
  }
}

export default TextframeComponent
