import {Component, FontAwesomeIcon, TextPropertyEditor} from 'substance';
import './scss/relatedlink.scss'

export default class RelatedLinkComponent extends Component {

  render($$) {
    var prefix = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'prefix',
      path: [this.props.node.id, 'prefix']
    }).addClass('prefix').attr({'contentEditable' : true, "data-text" : this.getLabel('Also read')}).ref('prefix');

    var leadText = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'leadtext',
      path: [this.props.node.id, 'leadtext']
    }).addClass('leadtext').attr({'contentEditable' : true, "data-text" : this.getLabel('Article title')}).ref('leadtext');

    var relatedUrl = $$(TextPropertyEditor, {
      tagName: 'div',
      name: 'relatedurl',
      path: [this.props.node.id, 'relatedurl']
    }).addClass('relatedurl').attr({'contentEditable' : true, "data-text" : "/"}).ref('relatedurl');

    var el = $$('a').append([
      $$('div').addClass('header').append([
        $$(FontAwesomeIcon, {icon: 'fa-angle-right'}).addClass('plugin-icon'),
        $$('div').addClass('plugin-title').append(this.getLabel("Related article"))
      ]),
      prefix,
      leadText,
      relatedUrl
    ]).addClass('fdmg-relatedlink fdmg-box im-blocknode__container').attr('contentEditable', false);

    this.context.api.events.on('publish-button', 'document:startsaving', () => this.updateRelatedLink());

    return el;
  }

  updateRelatedLink() {
    if (typeof(this.props.node.prefix) !== 'undefined' && typeof(this.props.node.leadText)!== 'undefined' && typeof(this.props.node.relatedUrl)!== 'undefined' ) {
      this.updateProps(this.refs.prefix.text(), this.refs.leadText.text(), this.refs.relatedUrl.text());
    }
  }

  updateProps() {
    this.props.doc.set([this.props.node, 'prefix'], this.props.node.prefix);
    this.props.doc.set([this.props.node, 'leadtext'], this.props.node.leadtext);
    this.props.doc.set([this.props.node, 'relatedurl'], this.props.node.relatedurl);
  }

}
