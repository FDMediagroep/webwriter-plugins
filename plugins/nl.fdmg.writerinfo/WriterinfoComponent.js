import { Component, FontAwesomeIcon } from 'substance';
import { api } from 'writer';

export default class WriterinfoComponent extends Component {

  render($$) {
    const documentUrl = api.getConfigValue("nl.fdmg.writerinfo", 'instructionsManualUrl');
    const hotlineNumber = api.getConfigValue("nl.fdmg.writerinfo", 'hotlineNumber');
    const mailAddress = api.getConfigValue("nl.fdmg.writerinfo", 'groupMailbox');
    const showContactInformation = api.getConfigValue("nl.fdmg.writerinfo", 'showContactInformation');

    const el = $$('div')
      .addClass('fdmg-sidebar writer-info');

    const helpButton = $$('a')
        .attr({
          'href': documentUrl,
          'target': '_blank'
        }).addClass('btn help-button btn-secondary')
        .append(
          this.getLabel('writer-info-help-button'),
          $$(FontAwesomeIcon, { icon: 'fa-question-circle' })
        );

    const hotlineButton = $$('a')
        .attr({
          'href': 'tel:' + hotlineNumber
        }).addClass('btn btn-secondary')
        .append(
          this.getLabel('writer-info-hotline-button'),
          hotlineNumber,
          $$(FontAwesomeIcon, { icon: 'fa-phone-square' })
        );

    const mailButton = $$('a')
        .attr({
          'href': 'mailto:' + mailAddress
        }).addClass('btn btn-secondary')
        .append(
          mailAddress,
          $$(FontAwesomeIcon, { icon: 'fa-envelope-square' })
        );
      
    if (showContactInformation === true) {
      return el.append( helpButton, $$('hr'), hotlineButton, mailButton );
    } else {
      return el.append( helpButton );
    }
    
  }
}