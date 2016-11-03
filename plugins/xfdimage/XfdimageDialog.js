'use strict'

const SurfaceTool = require('substance/ui/SurfaceTool')
const Icon = require('substance/ui/FontAwesomeIcon')
const Spinner = require('./SpinnerComponent')
const $$ = require('substance/ui/Component').$$
const $ = require('substance/util/jquery')

function XfdimageDialog() {
  XfdimageDialog.super.apply(this, arguments)
}

XfdimageDialog.Prototype = function() {

  this.getInitialState = function() {
    return {
      isSearching: false,
      lastQuery: '',

      pageIndex: 0,
      images: [],
      totalResults: -1,

      scrollOffset: 0
    }
  }

  this.didMount = function() {
    this.refs.searchfield.focus()
  }

  this.didUpdate = function() {
    $('#xfdimage-results').scrollTop(this.state.scrollOffset)
  }

  this.render = function() {
    return $$('div')
      .addClass('xfdimage')
      .append(
        $$('div')
          .addClass('xfdimage-searchbar')
          .append(
            $$('span')
              .append(
                $$('input')
                  .attr('placeholder', this.context.i18n.t('Search query'))
                  .setValue(this.state.lastQuery)
                  .ref('searchfield')
                  .on('keydown', this.handleSearchfieldKeyDown.bind(this)),
                $$('button')
                  .attr('title', this.context.i18n.t('Search'))
                  .append($$(Icon, {icon: 'fa-search'}))
                  .on('click', function() {
                    this.performSearch(this.refs.searchfield.val())
                  }.bind(this))
                // TODO Add upload button
              )
          ),
        $$('div')
          .addClass('xfdimage-results')
          .attr({id: 'xfdimage-results'})
          .append(
            this.state.images.map((image) => {
              return $$('img')
                .attr({src: image.thumbnailUrl})
                .on('click', function() {
                  this.send('close')
                  this.getCommand().insertImageById(image.id)
                }.bind(this))
            })
          )
          .append($$(Spinner, {isSearching: this.state.isSearching}))
          .on('DOMNodeInserted', this.didUpdate.bind(this))
          .on('scroll', this.handleScroll.bind(this))
      )
  }

  this.handleSearchfieldKeyDown = function(e) {
    switch (e.keyCode) {
      case 13:  // Enter
        this.performSearch(this.refs.searchfield.val())
        break
      case 27: // Escape
        this.send('close')
        break
    }
  }

  this.handleScroll = function() {
    if (!this.allResultsLoaded() && !this.state.isSearching) {
      const results = $('#xfdimage-results')
      const pixelsLeft = results.prop('scrollHeight') - results.height() - results.scrollTop()

      if (pixelsLeft < this.props.reloadScrollThreshold) {
        this.performSearch(this.state.lastQuery, this.state.pageIndex + 1)
      }
    }
  }

  this.allResultsLoaded = function() {
    return this.state.totalResults > -1 && this.state.images.length >= this.state.totalResults
  }

  this.performSearch = function(query, pageIndex = 0) {
    if (!this.allResultsLoaded()) {
      this.extendState({isSearching: true})

      this.getCommand().performSearch(query, pageIndex)
        .then(function(result) {
          this.extendState({
            isSearching: false,
            lastQuery: query,
            pageIndex: pageIndex,
            images: this.state.images.concat(result.images),
            totalResults: result.totalResults,
            scrollOffset: $('#xfdimage-results').scrollTop()
          })
        }.bind(this))
        .catch(function(err) {
          console.error(err)
          this.extendState(this.getInitialState())
        }.bind(this))
    }

    this.onClose = function(status) {
      return true
    }
  }
}

SurfaceTool.extend(XfdimageDialog)
XfdimageDialog.static.name = 'xfdimage'
XfdimageDialog.static.command = 'xfdimage'
module.exports = XfdimageDialog
