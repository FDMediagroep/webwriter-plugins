import {Component, FontAwesomeIcon, TextPropertyEditor} from 'substance';

export default class NumberFrameComponent extends Component {
  render($$) {
    let content = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'content',
      path: [this.props.node.id, 'content']
    }).addClass('content').attr({'contentEditable' : true, "data-text" : this.getLabel("Text")}).ref('content');

    let heading = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'heading',
      path: [this.props.node.id, 'heading']
    }).addClass('heading').attr({'contentEditable' : true, "data-text" : this.getLabel("Amount")}).ref('heading');

    let el = $$('a').append([
      $$('div').addClass('header').append([
        $$(FontAwesomeIcon, {icon: 'fa-money'}).addClass('plugin-icon'),
        $$('div').addClass('plugin-title').append(this.getLabel("Numberframe"))
      ]),
      heading,
      content
    ]).addClass('fdmg-numberframe fdmg-box').attr('contentEditable', false);

    this.context.api.events.on('publish-button', 'document:startsaving', () => this.updateNumberFrame());

    return el;
  }

  updateNumberFrame() {
    if (typeof(this.props.node.content) !== 'undefined' && typeof(this.props.node.heading)!== 'undefined') {
      this.updateProps(this.refs.content.text(), this.refs.heading.text());
    }
  }

  /*removeNumberFrame() {
    api.document.deleteNode('numberframe', this.props.node);
    api.editorSession.transaction((tx) => {
      const node = this.props.node
      tx.delete(node.id)
    })
  }*/

  updateProps() {
    this.props.doc.set([this.props.node, 'content'], this.props.node.content);
    this.props.doc.set([this.props.node, 'heading'], this.props.node.heading);
  }

}
