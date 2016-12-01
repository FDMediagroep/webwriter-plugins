'use strict'

const SurfaceTool = require('substance/ui/SurfaceTool')
const Icon = require('substance/ui/FontAwesomeIcon')
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
    //TODO: remove this when writer allows to control dialogs
    $('.xfdimage').parents('.modal-dialog').addClass('xfd-dialog');
  }

  this.didUpdate = function() {
    $('.xfdimage-results').scrollTop(this.state.scrollOffset)
  }

  this.render = function() {
    return $$('div')
      .addClass('xfdimage')
      .append(
        $$('div')
          .addClass('xfdimage-searchbar')
          .append(
            $$('div').addClass('form-group')
              .append(

                $$('input')
                  .attr({
                    'placeholder' : this.context.i18n.t('Search query'),
                    'class' : 'form-control form__search'
                  })
                  .setValue(this.state.lastQuery)
                  .ref('searchfield')
                  .on('keydown', this.handleSearchfieldKeyDown.bind(this)),
                $$('button')
                  .attr({
                    'title' : this.context.i18n.t('Search'),
                    'class' : 'btn btn-neutral'
                  })
                  .append(
                    $$(Icon, {icon: 'fa-search'}),
                    $$(Icon, {icon: 'fa-spinner fa-spin'})
                    .addClass(this.state.isSearching ? 'active': '')
                  )
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
              return $$('div')
                .append(
                  $$('img')
                    .attr({src: image.thumbnailUrl})
                    .on('click', function() {
                      this.send('close')
                      this.getCommand().insertImageById(image.id)
                    }.bind(this))
                )
            })
          )
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
      this.extendState({
        isSearching: true,
        scrollOffset: $('#xfdimage-results').scrollTop()
      })

      //TODO: remove this when writer allows to control dialogs
      $('.xfdimage').parents('.modal-dialog').addClass('xfd-dialog-expand');

      this.getCommand().performSearch(query, pageIndex)
        .then(function(result) {

            console.log('$$')
            console.log(result)

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
  }

  this.onClose = function(status) {
    return true
  }
}

SurfaceTool.extend(XfdimageDialog)
XfdimageDialog.static.name = 'xfdimage'
XfdimageDialog.static.command = 'xfdimage'
module.exports = XfdimageDialog
