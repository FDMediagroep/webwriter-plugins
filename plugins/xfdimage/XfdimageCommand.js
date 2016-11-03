'use strict'

const BlockContentCommand = require('writer/commands/BlockContentCommand')

function XfdimageCommand() {
  XfdimageCommand.super.apply(this, arguments)
}

XfdimageCommand.Prototype = function() {

  this.performSearch = function(query, pageIndex) {
    const resultsPerPage = this.context.api.getConfigValue('xfdimage', 'resultsPerPage', 25)
    const endpoint = this.context.api.getConfigValue('xfdimage', 'endpoint')

    console.log(`search q='${query}'`)

    // TODO Search actual image endpoint

    const images = this.__generateDummyImages(pageIndex, resultsPerPage)

    return Promise.resolve(images)
  }

  this.retrieveDownloadUrl = function(imageId) {
    console.log(`retrieveDownloadUrl id='${imageId}'`)

    // TODO Find actual download url
    return Promise.resolve('http://www.w3schools.com/css/img_fjords.jpg')
  }

  this.insertImageById = function(imageId) {
    console.log(`insertImageById id='${imageId}'`)

    this.retrieveDownloadUrl(imageId)
      .then(function(url) {
        const insertText = require('substance/model/transform/insertText')
        const surface = this.context.api.refs.writer.getFocusedSurface()
        surface.transaction((tx, args) => {
          args = insertText(tx, {
            selection: args.selection,
            text: url
          })
        })
      }.bind(this))
      .catch(console.error)
  }

  this.__generateDummyImages = function(index, rpp, totalResults = 42) {
    const colorize = function() {
      const v = Math.random() * 0xff | 0
      return ((v << 16) | (v << 8) | v).toString(16)
    }

    const generateImages = function() {
      const images = []
      const n = Math.min(rpp, totalResults - (index * rpp))
      for (let i = 0; i < n; i++) {
        images.push({
          id: Math.round(Math.random() * 0x7fffffff),
          thumbnailUrl: `http://placehold.it/160/${colorize()}`
        })
      }
      return images
    }

    return {
      totalResults: totalResults,
      images: generateImages()
    }
  }
}

BlockContentCommand.extend(XfdimageCommand)
XfdimageCommand.static.name = 'xfdimage'
module.exports = XfdimageCommand
