import {Component, FontAwesomeIcon} from 'substance'
import {api, moment} from 'writer'
import FileInputComponent from './FileInputComponent'
const pluginId = 'nl.fdmg.imagesearch'
/**
  * Params to pass when calling the dialogue
  *
  * @param loadNextScrollThreshold:
  * api.getConfigValue(pluginId, 'loadNextScrollThreshold', 100)
  * - The scrolltreshold, use default pluginId: 'nl.fdmg.imagesearch'.
  * @param {string} insertImageFromUrlCommand: 'insert-image-from-url' - the command to use
  * to insert an image from a url.
  * @param {string} insertImageCommand: 'ximteaserinsertimage' - the desired command to insertImageCommand
  * an image from a local source/drag and drop.
  * @param pluginNode : this.props.node (the node calling the plugin).
  *
*/
class ImageSearchDialog extends Component {

  get allResultsLoaded() {
    return this.state.totalResults > -1 && this.state.images.length >= this.state.totalResults
  }

  getInitialState() {
    return {
      isSearching: false,
      pageIndex: 0,
      images: [],
      totalResults: -1,
      scrollOffset: 0
    }
  }

  didMount() {
    this.refs.searchfield.getNativeElement().focus();

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
                  .ref('searchfield')
                  .on('keydown', this.onKeydown.bind(this)),
                $$('button')
                  .addClass('btn btn-neutral')
                  .attr({title: api.getLabel('Search')})
                  .append(
                    $$(FontAwesomeIcon, {icon: 'fa-search'}).on('click', () => {
                      this.extendState(this.getInitialState());
                      this.search(this.refs.searchfield.val());
                    }),
                    $$(FontAwesomeIcon, {icon: 'fa-spinner fa-pulse'}).addClass(this.state.isSearching ? 'active' : '')
                  ),
                  $$(FileInputComponent, {onChange: this.triggerFileUpload.bind(this)})
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
                    }),
                  $$('div').append(moment(image.pictureDate).format('DD-MM-YYYY'))
                )
            })
          )
          .ref('resultscontainer')
          .on('scroll', this.onScroll.bind(this))
      )
      .ref('dialog')

  }

  triggerFileDialog() {
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, false);
    this.refs['x-im-image-fileupload'].el.el.dispatchEvent(evt);

  }

  triggerFileUpload(ev) {
    const insertImageCommand = this.props.insertImageCommand
    const node = this.props.pluginNode

    if (insertImageCommand) {
      this.context.editorSession.executeCommand(insertImageCommand, {
        type: 'file',
        data: ev.target.files,
        context: {node: node}
      });
    } else {
      this.context.editorSession.executeCommand('insert-images', {
        files: ev.target.files
      });
    }
    this.send('close');
  }

  onKeydown(e) {
    switch(e.keyCode) {
      case 13:  // Enter
        e.stopPropagation();
        this.extendState({
          isSearching: false,
          lastQuery: this.refs.searchfield.val(),
          pageIndex: 0,
          images: [],
          totalResults: -1,
          scrollOffset: 0
        });
        this.search(this.refs.searchfield.val());
        break;
      case 27:  // Escape
        this.send('close');
        break;
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
    const command = this.props.insertImageFromUrlCommand

    if (command === "" || !command) {
      this._retrieveDownloadUrl(imageId)
        .then((url) => {
          api.editorSession.executeCommand('ximimage-insert-image-url', {
            imageUrl: url
          })
        })
        .catch(err => { console.error(err) })

    } else {
      const nodeId = this.props.pluginNode.id

      this._retrieveDownloadUrl(imageId)
        .then((url) => {
          api.editorSession.executeCommand(command, {
            imageUrl: url,
            context: {nodeId : nodeId}
          })
        })
        .catch(err => { console.error(err) })
    }
  }

  _performSearch(query, pageIndex) {
    const resultsPerPage = api.getConfigValue(pluginId, 'resultsPerPage', 25)
    const endpoint = api.getConfigValue(pluginId, 'searchEndpoint')
    const url = `${endpoint}?q=${query}&page=${pageIndex + 1}&result=${resultsPerPage}`
    const token = api.getConfigValue(pluginId, 'token')

    return fetch(url, {
      method: 'GET',
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
              thumbnailUrl: result.thumbnail_url,
              pictureDate: result.picturedate
            }
          })
        }
      })
  }

  _retrieveDownloadUrl(imageId) {
    const endpoint = api.getConfigValue(pluginId, 'fetchEndpoint')
    const url = `${endpoint}?id=${imageId}`
    const token = api.getConfigValue(pluginId, 'token')

    return fetch(url, {
      method: 'GET',
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
