import {AnnotationComponent, FontAwesomeIcon} from 'substance';

export default class StocktickerComponent extends AnnotationComponent {

  getInitialState() {
    return {
      symbol: '',
      currency: '',
      price: '',
      difference: ''
    }
  }

  didMount(...args) {
    super.didMount(...args);

    this.context.editorSession.onRender('document', this._onDocumentChange, this, {path: [this.props.node.id]});

    this.context.api.document.triggerFetchResourceNode(this.props.node);
  }

  render($$) {
    const el = $$('span').addClass('sc-stockticker');

    const node = this.props.node;
    if (node.symbol) {
      el
        .attr({
          'data-type': this.props.node.dataType,
          'data-isin-code': this.props.node.isin,
          'data-exchange': this.props.node.exchange
        })
        .append(
          node.symbol,
          $$('span')
            .addClass(parseFloat(node.difference) >= 0 ? 'up' : 'down')
            .append(`${node.currency} ${node.price} (${node.difference})`)
        );
    } else if (!node.symbol || node.symbol === '') {
      el.append($$('span').append(
        $$(FontAwesomeIcon, {icon: 'fa-exclamation-triangle'}).addClass('stockticker-warning'),
        this.getLabel('No stockticker chosen yet...'))
      );
    }

    return el;
  }

  dispose(...args) {
    super.dispose(...args);
    this.context.editorSession.off(this);
  }

  _onDocumentChange(change) {
    if (change.isAffected(this.props.node.id)) {
      this.rerender();
    }
  }
}
