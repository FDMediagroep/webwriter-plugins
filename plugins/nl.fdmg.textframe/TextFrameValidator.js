import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer';

export default class TextFrameValidator extends FDValidator {
  validate() {
    const i18n = api.getLabel;
    if (this.submitted || this.published) {
      const textframes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/textframe"]'));

      textframes.forEach((tf, i) => {

        const title = tf.attributes.getNamedItem('title');
        tf.querySelector('data>text');

        if (!title || title.value.trim() === '') {
          this.addError(`${i18n('Textframe is missing title')} (${i + 1})`);
        }
      })
    }
  }
}
