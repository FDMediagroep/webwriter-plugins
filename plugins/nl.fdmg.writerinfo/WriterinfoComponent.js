import { Component, FontAwesomeIcon } from 'substance';
import { api } from 'writer';

export default class WriterinfoComponent extends Component {

  render($$) {
    const documentUrl = api.getConfigValue("nl.fdmg.writerinfo", 'instructionsManualUrl');
    const hotlineNumber = api.getConfigValue("nl.fdmg.writerinfo", 'hotlineNumber');
    const mailAddress = api.getConfigValue("nl.fdmg.writerinfo", 'groupMailbox');

    const showInstructionsManual = api.getConfigValue("nl.fdmg.writerinfo", 'showInstructionsManual');
    const showHotlineNumber = api.getConfigValue("nl.fdmg.writerinfo", 'showHotlineNumber');
    const showGroupMailBox = api.getConfigValue("nl.fdmg.writerinfo", 'showGroupMailBox');

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
      
    if (showInstructionsManual === true) {
      el.append(helpButton, $$('hr'));
    }

    const hotlineButton = $$('a')
        .attr({
          'href': 'tel:' + hotlineNumber
        }).addClass('btn btn-secondary')
        .append(
          this.getLabel('writer-info-hotline-button'),
          hotlineNumber,
          $$(FontAwesomeIcon, { icon: 'fa-phone-square' })
        );

    if (showHotlineNumber === true && showInstructionsManual === false) {
      el.append($$('hr'), hotlineButton);
    } else if (showHotlineNumber === true) {
      el.append(hotlineButton);
    }

    const mailButton = $$('a')
        .attr({
          'href': 'mailto:' + mailAddress
        }).addClass('btn btn-secondary')
        .append(
          mailAddress,
          $$(FontAwesomeIcon, { icon: 'fa-envelope-square' })
        );
      
    if (showGroupMailBox === true) {
      el.append(mailButton);
    }

    return el;
    
  }
}