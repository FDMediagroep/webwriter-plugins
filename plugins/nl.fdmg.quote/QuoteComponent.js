import {Component, FontAwesomeIcon, TextPropertyEditor} from 'substance';
import {api} from 'writer';

export default class QuoteComponent extends Component {

  render($$) {
    var message = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'message',
      path: [this.props.node.id, 'message']
    }).addClass('content').attr({
      'contentEditable': true,
      "data-text": this.getLabel("Quote")
    }).ref('message');

    var author = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'author',
      path: [this.props.node.id, 'author']
    }).addClass('heading').attr({
      'contentEditable': true,
      "data-text": this.getLabel("Source")
    }).ref('author');

    var el = $$('a').append([
      $$('div').addClass('header').append([
        $$(FontAwesomeIcon, {icon: 'fa-quote-left'}).addClass('plugin-icon'),
        $$('div').addClass('plugin-title').append(this.getLabel("Quote")),
        $$('span').addClass('remove-button').append(
          $$(FontAwesomeIcon, {icon: 'fa-remove'})
        ).on('click', () => this.removeQuote() ).attr('title', this.getLabel('Verwijderen uit artikel'))
      ]),
      message,
      author
    ]).addClass('fdmg-quote fdmg-box').attr('contentEditable', false);

    this.context.api.events.on('publish-button', 'document:startsaving', () => {
      this.updateQuote();
    });

    return el;
  }

  updateQuote() {
    if (typeof(this.props.node.message) !== 'undefined' && typeof(this.props.node.author) !== 'undefined') {
      this.updateProps(
        this.refs.message.text(), this.refs.author.text()
      );
    }
  }

  removeQuote() {
    api.document.deleteNode('quote', this.props.node);
  }

  updateProps() {
    this.props.doc.set([this.props.node, 'message'], this.props.node.message);
    this.props.doc.set([this.props.node, 'author'], this.props.node.author);
  }
}
