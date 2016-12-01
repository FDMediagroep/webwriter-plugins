'use strict'

const BlockContentCommand = require('writer/commands/BlockContentCommand')
const $ = require('substance/util/jquery')

function XfdimageCommand() {
  XfdimageCommand.super.apply(this, arguments)
}

XfdimageCommand.Prototype = function() {

  this.performSearch = function(query, pageIndex) {
    const resultsPerPage = this.context.api.getConfigValue('xfdimage', 'resultsPerPage', 25)
    const searchEndpoint = this.context.api.getConfigValue('xfdimage', 'searchEndpoint')
    const oAuthToken = this.context.api.getConfigValue('xfdimage', 'token')

    const url = `${searchEndpoint}?q=${query}&page=${pageIndex + 1}`

    const proxy = this.context.api.router.getEndpoint() + '/api/proxy?url=';

    return new Promise(function(resolve, reject) {
        $.ajax({
            // url: proxy + encodeURIComponent(url),
            url: url,
            method: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader('Authorization', oAuthToken)
            }
        }).done((result) => {
            const response = {
                totalResults: result.info.totalresults,
                images: result.result.map((img) => {
                    return {id: img.id, thumbnailUrl: img.thumbnail_url}
                })
            }
            resolve(response)
        }).fail((err) => {
            console.error(err)
            reject(err)
        })
    })

    // return Promise.resolve(
    // this.__generateDummyImages(pageIndex, resultsPerPage)
    // )
  }

  this.retrieveDownloadUrl = function(imageId) {

      const downloadEndpoint = this.context.api.getConfigValue('xfdimage', 'downloadEndpoint')
      const oAuthToken = this.context.api.getConfigValue('xfdimage', 'token')

      const url = `${downloadEndpoint}?id=${imageId}`

      const proxy = this.context.api.router.getEndpoint() + '/api/proxy?url=';

      console.log(url)

      return new Promise(function(resolve, reject) {
          $.ajax({
              //   url: proxy + encodeURIComponent(url),
              url: url,
              method: 'GET',
              contentType: 'application/json',
              beforeSend: function(request) {
                  request.setRequestHeader('Authorization', oAuthToken)
              }
          }).done((result) => {
              console.log(result)


              resolve(result.url)
            //   resolve('http://www.w3schools.com/css/img_fjords.jpg')
          }).fail((err) => {
              console.error(err)
              reject(err);
          })
      })



    // return Promise.resolve('http://www.w3schools.com/css/img_fjords.jpg')
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

    const sizes = [
      [320, 180],
      [180, 320],
      [200, 200]
    ]

    const generateImages = () =>
      Array(Math.min(rpp, totalResults - (index * rpp)))
        .fill(undefined)
        .map(() => {
          const color = colors[Math.floor(Math.random() * colors.length)]
          const size = sizes[Math.floor(Math.random() * sizes.length)].join('x')

          return {
            id: Math.round(Math.random() * 0x7fffffff),
            thumbnailUrl: `http://placehold.it/${size}/${color}`
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
