'use strict'

const BlockContentCommand = require('writer/commands/BlockContentCommand')
const _ = require('lodash')

function ImagesearchCommand() {
  ImagesearchCommand.super.apply(this, arguments)
}

ImagesearchCommand.Prototype = function() {

  this.handleFiles = function(files) {
    if (!_.isArrayLike(files)) {
      this.handleFile(files)
    } else {
      for (let i = 0; i < files.length; i++) {
        this.handleFile(files[i])
      }
    }
  }

  this.handleId = function(imageId) {
    console.log('cmd::handleId', imageId)

    // TODO Insert url into document

    this.getDownloadUrl(imageId, function(err, result) {
      if (err != null) {
        console.log(err)
      } else {
        console.log('~>', result)
      }
    })
  }

  this.searchImage = function(query, pageIndex, resultsPerPage, callback) {
    console.log(`cmd::searchImage '${query}' pi=${pageIndex} rpp=${resultsPerPage}`)

    const genColor = function() {
      const val = Math.random() * 0xff | 0
      return ((val << 16) | (val << 8) | val).toString(16)
    }

    const genImages = function(n) {
      const images = []
      for (let i = 0; i < n; i++) {
        images.push({
          id: Math.round(Math.random() * 0x7fffffff),
          thumbnailUrl: `http://placehold.it/160/${genColor()}`
        })
      }
      return images
    }

    const TOTAL_RESULTS = 42
    const n = Math.min(resultsPerPage, TOTAL_RESULTS - (pageIndex) * resultsPerPage)

    setTimeout(() => {
      callback(null, {
        totalResults: TOTAL_RESULTS,
        images: genImages(n)
      })
    }, Math.random() * 1500 + 500)
  }

  this.getDownloadUrl = function(imageId, callback) {

    // TODO Find actual download url
    callback(null, "https://cdn-images-1.medium.com/max/800/0*eIftYj-G7GSiHZ_B.jpg")
  }
}

BlockContentCommand.extend(ImagesearchCommand)
ImagesearchCommand.static.name = 'imagesearch'
module.exports = ImagesearchCommand
