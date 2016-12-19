import {Validator, api} from 'writer'

class FDValidor extends Validator {
  get qcode() {
    return api.newsItem.getPubStatus().qcode
  }

  get drafted() {
    return this.qcode === 'imext:draft'
  }

  get submitted() {
    return this.qcode === 'stat:withheld' || this.qcode === 'imext:done'
  }

  get published() {
    return this.qcode === 'stat:usable'
  }

  get isShortArticle() {
    const shortarticle = this.newsItem.querySelector('itemMeta > links link[type="fdmg/shortarticle"]')

    return (shortarticle && shortarticle.getAttribute('checked') === 'true')
  }

  get isAdvertorial() {
    const advertorial = this.newsItem.querySelector('itemMeta > links link[type="fdmg/advertorial"]')

    return (advertorial && advertorial.getAttribute('checked') === 'true')
  }

  get isEvents() {
    const articletype = this.newsItem.querySelector('itemMeta > links link[type="fdmg/articletype"]')

    return (articletype && articletype.getAttribute('id') === 'EVENT')
  }

  get isRedirectArticle() {
    const redirectlink = this.newsItem.querySelector('itemMeta > links link[type="fdmg/redirectlink"]')

    return (redirectlink && redirectlink.getAttribute('checked') === 'true')
  }

  getLabel(label) {
    return api.getLabel(label)
  }
}

export default FDValidor
