import {Tool} from 'substance';
import {api} from 'writer';
import SearchField from '../nl.fdmg.searchfield/SearchFieldComponent';

export default class StocktickerInlineTool extends Tool {

  render($$) {
    const node = this.props.node;
    const el = $$('div');
    // const selector = querySelectorAll('object[type="fdmg/quote"] message')
    if (node) {
      el
        .addClass('se-tool sc-stockticker-inline-tool')
        .append(
          $$(SearchField, {
            doSearch: this.performSearch.bind(this),
            onSelect: this.onSelect.bind(this),
            autoFocus: true
          })
        ).on('keydown', this.onKeyDown);
    }

    return el
  }

  // Initial code to try and remove the component and node when no
  // stockticker is selected but pop-over is closed by the user
  // isEmptyNode() {
  //   // Get all inline nodes
  //   var inlineNodes = writer.api.editorSession.document.data.nodes;
  //   for (var key in inlineNodes) {
  //
  //     if (!inlineNodes.hasOwnProperty(key)) {
  //       continue;
  //     }
  //     // send all nodes to remove function
  //     var inlineNode = inlineNodes[key];
  //     this.removeEmptyStockTickers(inlineNode)
  //   }
  // }
  //
  // removeEmptyStockTickers(node) {
  //   // Check if node is of type stockticker, if so and isin is empty remove node
  //   if (node.isin === "" && node.dataType === "fdmg/stockticker") {
  //     console.log(node.id)
  //     console.log(this.props.node)
  //     const something = this.getNode();
  //     console.log(something)
  //     // this.delete();
  //     api.editorSession.transaction((tx, node) => {
  //       const nodeId = node.id;
  //       tx.delete('stockticker', nodeId)
  //     })
  //   } else {
  //     return;
  //   }
  // }

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

  //document.querySelector('html').classList.add('hide-text-annotation');

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
