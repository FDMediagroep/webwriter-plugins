import {InlineNode} from 'substance'
import {api} from 'writer'

class StocktickerNode extends InlineNode {

  fetchPayload(context, callback) {

    const endpoint = api.getConfigValue('nl.fdmg.stockticker', 'endpoint')
    const url = endpoint + this.isin

    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(xmlString, 'text/xml')
        const quotes = Array.from(xml.querySelectorAll('quote'))

        const quote = quotes.filter(q => q.querySelector('exchange').textContent === this.exchange).pop()

        callback(null, {
          name: quote.querySelector('name').textContent,
          symbol: quote.querySelector('ticker').textContent,
          isin: quote.querySelector('isin').textContent,
          exchange: quote.querySelector('exchange').textContent,
          currency: quote.querySelector('currency').textContent,
          price: quote.querySelector('price').textContent,
          difference: quote.querySelector('difference').textContent
        })
      })
      .catch(err => {
        callback(err)
      })
  }

  search(query) {
    const endpoint = api.getConfigValue('nl.fdmg.stockticker', 'endpoint')
    const url = endpoint + query

    return fetch(url, {
      credentials: 'include'
    })
      .then(response => response.text())
      .then(xmlString => {
        const parser = new DOMParser()
        const xml = parser.parseFromString(xmlString, 'text/xml')
        const quotes = xml.querySelectorAll('quote')

        return Array.prototype.map.call(quotes, quote => {
          return {
            id: `${quote.querySelector('exchange').textContent}${quote.querySelector('isin').textContent}`,
            label: `${quote.querySelector('name').textContent} (${quote.querySelector('exchange').textContent})`,

            name: quote.querySelector('name').textContent,
            symbol: quote.querySelector('ticker').textContent,
            isin: quote.querySelector('isin').textContent,
            exchange: quote.querySelector('exchange').textContent,
            currency: quote.querySelector('currency').textContent,
            price: quote.querySelector('price').textContent,
            difference: quote.querySelector('difference').textContent
          }
        })
      })
  }
}

StocktickerNode.isResource = true

StocktickerNode.define({
  type: 'stockticker',
  dataType: 'string',
  isin: 'string',
  exchange: 'string',
  name: {type: 'string', optional: true},
  symbol: {type: 'string', optional: true},
  difference: {type: 'string', optional: true},
  price: {type: 'string', optional: true},
  currency: {type: 'string', optional: true},
  errorMessage: {type: 'string', optional: true}
})

export default StocktickerNode
