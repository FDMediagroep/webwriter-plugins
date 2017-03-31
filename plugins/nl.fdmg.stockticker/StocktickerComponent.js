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

    // Use this for when we want to dynamically get the latest stock quote data when loadling the document
    // this.context.api.document.triggerFetchResourceNode(this.props.node);
  }

  getDifferenceClass(difference) {

    const differenceValue = difference.replace(',', '.');
    let differenceClass = parseFloat(differenceValue);

    if (differenceClass >= 0) {
      return 'up';
    } else if (differenceClass < 0) {
      return 'down'
    } 

    return 'neutral';

  }

  render($$) {
    const el = $$('span').addClass('sc-stockticker');
    const node = this.props.node;

    if (node.name) {
      const lineChartIcon = $$(FontAwesomeIcon, {icon: 'fa-line-chart'});
      const differenceClass = this.getDifferenceClass(this.props.node.difference)

      el
        .attr({
          'data-type': this.props.node.dataType,
          'data-isin-code': this.props.node.isin,
          'data-exchange': this.props.node.exchange
        })
        .append(
          lineChartIcon,
          node.name,
          $$('span')
            .addClass(differenceClass)
            .append(`${node.currency} ${node.price} (${node.difference})`)
        );
    } else {
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
