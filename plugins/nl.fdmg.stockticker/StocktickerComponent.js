import {AnnotationComponent} from 'substance'

// var VWDUtil = new (require('./VWDUtil'))();

class StocktickerComponent extends AnnotationComponent {

  constructor(...args) {
    super(...args)
  }

  didMount(...args) {
    super.didMount(...args)

    this.context.editorSession.onRender('document', this._onDocumentChange, this, {path: [this.props.node.id]})
    // this.props.node.on('price:changed', this.changed, this)
    this.context.api.document.triggerFetchResourceNode(this.props.node)


  }

  dispose(...args) {
    super.dispose(...args)
    this.context.editorSession.off(this)
  }


  _onDocumentChange(change) {
    if (change.isAffected(this.props.node.id)) {
      this.rerender()
    }
  }

  getInitialState() {
    return {
      symbol: '',
      currency: '',
      price: '',
      difference: ''
    }
  }

  render($$) {
    var el = $$('span')
        .addClass('sc-stockticker');

    const node = this.props.node

    if (node.symbol) {
      el.append(
        node.symbol,
        $$('span')
        .addClass(parseFloat(node.difference) >= 0 ? 'up' : 'down')
        .append(
          node.name,
          node.currency,
          node.price,
          ' ',
          '(' + node.difference + ')'
        )
      )
      .attr({
        'data-type': this.props.node.dataType,
        'data-isin-code': this.props.node.isin,
        'data-exchange': this.props.node.exchange
      });
    } else {
      el.append($$('span').append('loading..'))
    }

    return el;
  }

  onNodeChanged() {
    this.load(this.props.node.isin, this.props.node.exchange);
  }
}

export default StocktickerComponent

