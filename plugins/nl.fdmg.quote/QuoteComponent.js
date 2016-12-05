import { Component, FontAwesomeIcon, TextPropertyComponent } from 'substance';

export default class QuoteComponent extends Component {

  render($$) {
    var message = $$(TextPropertyComponent, {
      tagName: 'div',
      name: 'message',
      path: [this.props.node.id, 'message']
    })
    .addClass('content').attr({'contentEditable' : true, "data-text" : this.context.i18n.t("Quote")}).ref('message');

    var author = $$(TextPropertyComponent, {
      tagName: 'div',
      name: 'author',
      path: [this.props.node.id, 'author']
    }).addClass('heading').attr({'contentEditable' : true, "data-text" : this.context.i18n.t("Source")}).ref('author');

    var el = $$('a').append([
      $$('div').addClass('header').append([
        $$(FontAwesomeIcon, {icon: 'fa-quote-left'}).addClass('plugin-icon'),
        $$('div').addClass('plugin-title').append(this.context.i18n.t("Quote")),
        $$('span').addClass('remove-button').append(
          $$(FontAwesomeIcon, {icon: 'fa-remove'})
        ).on('click', this.removeQuote).attr('title', this.getLabel('Verwijderen uit artikel'))
      ]),
      message, 
      author
    ]).addClass('fdmg-quote fdmg-box').attr('contentEditable', false);

    this.context.api.handleDrag(
      el,
      this.props.node
    );

    this.context.api.on('publish-button', 'document:startsaving', function () {
      this.updateQuote();
    }.bind(this));

    return el;
  }

  updateQuote() {
    if (typeof(this.props.node.message) !== 'undefined' && typeof(this.props.node.author)!== 'undefined') {
      this.updateProps(
        this.refs.message.text(), this.refs.author.text()  
      ); 
    }
  }

  removeQuote() {
    this.context.api.deleteNode('quote', this.props.node);
  }

  updateProps() {
    this.props.doc.set([this.props.node, 'message'], this.props.node.message);
    this.props.doc.set([this.props.node, 'author'], this.props.node.author);
  }
}
