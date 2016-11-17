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

    const colors = [
      '212529',
      'c92a2a',
      'a61e4d',
      '862e9c',
      '5f3dc4',
      '364fc7',
      '1862ab',
      '0b7285',
      '087f5b',
      '2b8e3e',
      '5c940d',
      'e67700',
      'd9480f'
    ]

    const generateImages = () =>
      Array(Math.min(rpp, totalResults - (index * rpp)))
        .fill(undefined)
        .map(() => {
          return {
            id: Math.round(Math.random() * 0x7fffffff),
            thumbnailUrl: 'http://placehold.it/160/' + colors[Math.floor(Math.random() * colors.length)]
          }
        })

    return {
      totalResults: totalResults,
      images: generateImages()
    }
  }
}

BlockContentCommand.extend(XfdimageCommand)
XfdimageCommand.static.name = 'xfdimage'
module.exports = XfdimageCommand
