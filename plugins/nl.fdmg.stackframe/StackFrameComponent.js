import {Component, FontAwesomeIcon, TextPropertyEditor} from 'substance';
import './scss/stackframe.scss'

export default class StackFrameComponent extends Component {
  render($$) {
    var content = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'content',
      path: [this.props.node.id, 'content']
    }).addClass('content').attr({'contentEditable' : true, "data-text" : this.getLabel('Text')}).ref('content');

    var heading = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'heading',
      path: [this.props.node.id, 'heading']
    }).addClass('heading').attr({'contentEditable' : true, "data-text" : this.getLabel('Title')}).ref('heading');

    var el = $$('a').append([
      $$('div').addClass('header').append([
        $$(FontAwesomeIcon, {icon: 'fa-database'}).addClass('plugin-icon'),
        $$('div').addClass('plugin-title').append(this.getLabel("Stackframe"))
      ]),
      heading,
      content
    ]).addClass('fdmg-stackframe fdmg-box im-blocknode__container').attr('contentEditable', false);

    this.context.api.events.on('publish-button', 'document:startsaving', () => this.updateStackFrame());

    return el;
  }

  updateStackFrame() {
    if (typeof(this.props.node.content) !== 'undefined' && typeof(this.props.node.heading)!== 'undefined') {
      this.updateProps(this.refs.content.text(), this.refs.heading.text());
    }
  }

  updateProps() {
    this.props.doc.set([this.props.node, 'content'], this.props.node.content);
    this.props.doc.set([this.props.node, 'heading'], this.props.node.heading);
  }

}
