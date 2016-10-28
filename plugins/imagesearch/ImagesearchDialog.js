'use strict'

const SurfaceTool = require('substance/ui/SurfaceTool')
const Icon = require('substance/ui/FontAwesomeIcon')
const SpinnerComponent = require('./SpinnerComponent')
const $$ = require('substance/ui/Component').$$
const $ = require('substance/util/jquery')

function ImagesearchDialog() {
  ImagesearchDialog.super.apply(this, arguments)
}

ImagesearchDialog.Prototype = function() {

  this.getInitialState = function() {
    return {
      isSearching: false,
      currentQuery: '',

      pageIndex: 0,
      images: [],
      totalResults: -1,

      scrollOffset: 0
    }
  }

  this.didMount = function() {
    this.refs.searchfield.focus()
  }

  this.render = function() {

    const searchBar = $$('div')
      .addClass('imagesearch-searchbar')
      .append(
        $$('span').append(
          $$('input')
            .on('keydown', function(e) {
              switch(e.keyCode) {
                case 13:  // enter
                  this.loadResults(this.refs.searchfield.val(), 0)
                  break;
                case 27:  // escape
                  this.send('close')
                  break;
              }
            }.bind(this))
            .attr('placeholder', 'search query')
            .setValue(this.state.currentQuery)
            .ref('searchfield')
        ),
        $$('button')
          .attr('title', this.context.i18n.t('Search'))
          .append($$(Icon, {icon: 'fa-search'}))
          .on('click', function() {
            this.loadResults(this.refs.searchfield.val(), 0)
          }.bind(this))
      )

    const images = this.state.images.map((i) => {
      return $$('img')
        .attr('src', i.thumbnailUrl)
      })

    const spinner = $$(SpinnerComponent, {isSearching: this.state.isSearching})

    const results = $$('div')
      .addClass('imagesearch-results')
      .append(images)
      .append(spinner)
      .attr('id', 'imagesearch-results-container')
      .on('DOMNodeInserted', this.didUpdate.bind(this))
      .on('scroll', function() {

        if (!this.allResultsLoaded() && !this.state.isSearching) {

          const results = $('#imagesearch-results-container')
          const pixelsLeft = (results.prop('scrollHeight') - results.height()) - results.scrollTop()

          if (pixelsLeft < this.props.reloadScrollThreshold) {
            this.loadResults(
              this.state.currentQuery,
              this.state.pageIndex + 1
            )
          }
        }
      }.bind(this))

    // setTimeout(this.didUpdate.bind(this), 250)

    return $$('div')
      .addClass('imagesearch')
      .append(
        searchBar,
        results
      )
  }

  this.didUpdate = function() {
    console.log('LOAD', this.state.scrollOffset)
    $('#imagesearch-results-container').scrollTop(this.state.scrollOffset)
  }

  this.allResultsLoaded = function() {
    return this.state.totalResults > -1 && this.state.images.length >= this.state.totalResults
  }

  this.loadResults = function(query, pageIndex) {
    if (this.allResultsLoaded()) return

    this.extendState({isSearching: true})

    this.getCommand().search(query, this.props.resultsPerPage, pageIndex, function(err, result) {

      if (err != null) {
        console.log(err)

        this.extendState(this.getInitialState())  // fallback to defaults
      } else {

        this.extendState({
          isSearching: false,
          currentQuery: query,
          pageIndex: pageIndex,
          images: this.state.images.concat(result.images),
          totalResults: result.totalResults,
          scrollOffset: $('#imagesearch-results-container').scrollTop()
        })


        console.log('SAVE', $('#imagesearch-results-container').scrollTop(), this.state.scrollOffset)

        // console.log(`${result.images.length} Loaded n=${this.state.images.length} T=${this.state.totalResults}`)
      }

    }.bind(this))
  }

  this.onSelect = function() {
    console.log('SEL')


    this.send('close')
  }

  this.onClose = function(status) {
    console.log('x', status)

    return true
  }
}

SurfaceTool.extend(ImagesearchDialog)
ImagesearchDialog.static.name = 'imagesearch'
ImagesearchDialog.static.command = 'imagesearch'
module.exports = ImagesearchDialog
