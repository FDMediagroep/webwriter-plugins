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
    return false
  }

  get isAdvertorial() {
    return false
  }

  get isEventArticle() {
    return false
  }

  get isRedirectArticle() {
    return false
  }

  getLabel(label) {
    return api.getLabel(label)
  }
}

export default FDValidor
