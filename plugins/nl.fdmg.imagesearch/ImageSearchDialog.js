import {Component, FontAwesomeIcon} from 'substance'
import {api} from 'writer'
const pluginId = 'nl.fdmg.imagesearch'

class ImageSearchDialog extends Component {

  get allResultsLoaded() {
    return this.state.totalResults > -1 && this.state.images.length >= this.state.totalResults
  }

  getInitialState() {
    return {
      isSearching: false,
      lastQuery: '',
      pageIndex: 0,
      images: [],
      totalResults: -1,
      scrollOffset: 0
    }
  }

  didMount() {
    this.refs.searchfield.focus()

    // TODO Make this more solid, don't rely on .parent * 3
    this.refs.dialog.parent.parent.parent.addClass('image-search-dialog')
  }

  didUpdate() {
    this.refs.resultscontainer.el.el.scrollTop = this.state.scrollOffset
  }

  render($$) {
    return $$('div')
      .addClass('image-search')
      .append(
        $$('div')
          .addClass('image-search-searchbar')
          .append(
            $$('div')
              .addClass('form-group')
              .append(
                $$('input')
                .addClass('form-control form__search')
                .attr({'placeholder': api.getLabel('Search query')})
                .setValue(this.state.lastQuery)
                .ref('searchfield')
                .on('keydown', this.onKeydown.bind(this)),
              $$('button')
                .addClass('btn btn-neutral')
                .attr({title: api.getLabel('Search')})
                .append(
                  $$(FontAwesomeIcon, {icon: 'fa-search'}),
                  $$(FontAwesomeIcon, {icon: 'fa-spinner fa-pulse'}).addClass(this.state.isSearching ? 'active' : '')
                )
                .on('click', () => {
                  this.search(this.refs.searchfield.val())
                })
              // TODO Add upload button
              )
          ),
        $$('div')
          .addClass('image-search-results')
          .append(
            this.state.images.map(image => {
              return $$('div')
                .append(
                  $$('img')
                    .attr({src: image.thumbnailUrl})
                    .on('click', () => {
                      this.send('close')
                      this.insertImageById(image.id)
                    })
                )
            })
          )
          .ref('resultscontainer')
          .on('scroll', this.onScroll.bind(this))
      )
      .ref('dialog')
  }

  onKeydown(e) {
    switch(e.keyCode) {
      case 13:  // Enter
        this.search(this.refs.searchfield.val())
        break
      case 27:  // Escape
        this.send('close')
        break
      default:
        // Nop
        break
    }
  }

  onScroll() {
    if (!this.allResultsLoaded && !this.state.isSearching) {
      const rc = this.refs.resultscontainer.el.el
      const rcsh = rc.scrollHeight
      const rch = parseInt(window.getComputedStyle(rc).getPropertyValue('height'), 10)
      const rcst = rc.scrollTop
      const pixelsLeft = rcsh - rch - rcst

      if (pixelsLeft < this.props.loadNextScrollThreshold) {
        this.search(this.state.lastQuery, this.state.pageIndex + 1)
      }
    }
  }

  search(query, pageIndex = 0) {
    if (!this.allResultsLoaded) {
      this.extendState({
        isSearching: true,
        scrollOffset: this.refs.resultscontainer.el.el.scrollTop
      })

      this.refs.dialog.parent.parent.parent.addClass('image-search-dialog-expand')

      this._performSearch(query, pageIndex)
        .then(results => {
          this.extendState({
            isSearching: false,
            lastQuery: query,
            pageIndex: pageIndex,
            images: this.state.images.concat(results.images),
            totalResults: results.totalResults,
            scrollOffset: this.refs.resultscontainer.el.el.scrollTop
          })
        })
        .catch((err) => {
          console.warn(err)
          this.extendState(this.getInitialState())
        })
    }
  }

  onClose() {
    return true
  }

  insertImageById(imageId) {
    this._retrieveDownloadUrl(imageId)
      .then((url) => {


        // FIXME Actually insert image
        api.editorSession.executeCommand('ximimage-insert-image-url', {
          imageUrl: url
        })
      })
      .catch(err => { console.error(err) })
  }

  _performSearch(query, pageIndex) {
    const resultsPerPage = api.getConfigValue(pluginId, 'resultsPerPage', 25)
    const endpoint = api.getConfigValue(pluginId, 'searchEndpoint')
    const token = api.getConfigValue(pluginId, 'token')

    return api.router.get('/api/resourceproxy', {
      url: `${endpoint}?q=${query}&page=${pageIndex + 1}&result=${resultsPerPage}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => api.router.checkForOKStatus(response))
      .then(response => api.router.toJson(response))
      .then(response => {
        return {
          info: {
            page: response.info.page,
            pageSize: response.info.pagesize,
            totalResults: response.info.totalresults
          },
          images: response.result.map(result => {
            return {
              id: result.id,
              thumbnailUrl: result.thumbnail_url
            }
          })
        }
      })
  }

  _retrieveDownloadUrl(imageId) {
    const endpoint = api.getConfigValue(pluginId, 'fetchEndpoint')
    const token = api.getConfigValue(pluginId, 'token')

    return api.router.get('/api/resourceproxy', {
      url: `${endpoint}?id=${imageId}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => api.router.checkForOKStatus(response))
      .then(response => api.router.toJson(response))
      .then(response => response.url)
  }
}

export default ImageSearchDialog
