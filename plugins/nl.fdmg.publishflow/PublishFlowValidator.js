import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';
import {moment} from 'writer';

class PublishFlowValidator extends FDValidator {
  validate() {
    console.log('validate')

    // Check if the withheld date is in the future, else throw error and stop save.
    if (this.withheld) {
      const now = moment();
      const withheldDate = this.newsItem.querySelector('itemMeta > itemMetaExtProperty[type="imext:pubstart"]').getAttribute('value');

      if (moment(withheldDate).isBefore(now)) {
        this.addError(this.getLabel("Embargo date must be in the future"))
      }

    }
  }
}


export default PublishFlowValidator;
