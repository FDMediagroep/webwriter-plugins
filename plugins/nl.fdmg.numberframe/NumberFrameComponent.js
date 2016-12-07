import {Component, FontAwesomeIcon, TextPropertyEditor} from 'substance';
import {api} from 'writer';

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
        $$('div').addClass('plugin-title').append(this.getLabel("Numberframe")),
        $$('span').addClass('remove-button').append(
          $$(FontAwesomeIcon, {icon: 'fa-remove'})
        ).on('click', this.removeNumberFrame)
        .attr('title', this.getLabel('Verwijderen uit artikel'))
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

  removeNumberFrame() {
    api.document.deleteNode('numberframe', this.props.node);
  }

  updateProps() {
    this.props.doc.set([this.props.node, 'content'], this.props.node.content);
    this.props.doc.set([this.props.node, 'heading'], this.props.node.heading);
  }

}
