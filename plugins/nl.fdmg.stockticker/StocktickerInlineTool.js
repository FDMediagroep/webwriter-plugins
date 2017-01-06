import {Tool} from 'substance';
import {api} from 'writer';
import SearchField from '../nl.fdmg.searchfield/SearchFieldComponent';

export default class StocktickerInlineTool extends Tool {

  render($$) {
    const node = this.props.node;
    const el = $$('div');

    if (node) {
      el
        .addClass('se-tool sc-stockticker-inline-tool')
        .append(
          $$(SearchField, {
            doSearch: this.performSearch.bind(this),
            onSelect: this.onSelect.bind(this),
            autoFocus: true
          })
        )
        .on('keydown', this.onKeyDown);
    }

    return el
  }

  getNode() {
    if (this.props.annotationId) {
      return this.context.doc.get(this.props.annotationId);
    }
  }

  performSearch(query) {
    return this.props.node.search(query);
  }

  onSelect(quote) {
    api.editorSession.transaction(tx => {
      tx.set([this.props.node.id, 'name'], quote.name);
      tx.set([this.props.node.id, 'symbol'], quote.symbol);
      tx.set([this.props.node.id, 'isin'], quote.isin);
      tx.set([this.props.node.id, 'exchange'], quote.exchange);
      tx.set([this.props.node.id, 'currency'], quote.currency);
      tx.set([this.props.node.id, 'price'], quote.price);
      tx.set([this.props.node.id, 'difference'], quote.difference)
    });

    this.close()
  }

  onKeyDown(e) {
    if (e.keyCode === 27 /* escape */) {
      this.close();
    }
  }

  close() {
    console.warn('Closing a Tool manually is not supported / implemented');
    this.send('close');
  }
}
