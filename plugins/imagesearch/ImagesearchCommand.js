'use strict'

const BlockContentCommand = require('writer/commands/BlockContentCommand')

function ImagesearchCommand() {
  ImagesearchCommand.super.apply(this, arguments)
}

ImagesearchCommand.Prototype = function() {

  this.search = function(query, resultsPerPage, pageIndex, cb) {

    console.log(`search: ${query} ${resultsPerPage} ${pageIndex}`)


    const genColor = function() {
      const val = Math.random() * 0xff | 0
      return ((val << 16) | (val << 8) | val).toString(16)
    }

    const genImages = function(n) {
      const images = []
      for (let i = 0; i < n; i++) {
        images.push({
          id: Math.random() * 0x7fffffff,
          thumbnailUrl: `http://placehold.it/160/${genColor()}`
        })
      }
      return images
    }





    const TOTAL_RESULTS = 42
    const n = Math.min(resultsPerPage, TOTAL_RESULTS - (pageIndex) * resultsPerPage)

    setTimeout(() => {
      cb(null, {
        totalResults: TOTAL_RESULTS,
        images: genImages(n)
      })
    }, Math.random() * 1500 + 500)





  }
}

BlockContentCommand.extend(ImagesearchCommand)
ImagesearchCommand.static.name = 'imagesearch'
module.exports = ImagesearchCommand
