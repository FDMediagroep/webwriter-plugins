import { Component, FontAwesomeIcon } from 'substance';
import { api } from 'writer';

export default class WriterinfoComponent extends Component {

  render($$) {
    const documentUrl = api.getConfigValue("nl.fdmg.writerinfo", 'instructionsManualUrl');

    return $$('div')
      .addClass('fdmg-sidebar writer-info')
      .append(
        $$('a')
        .attr({
          'href': documentUrl,
          'target': '_blank'
        }).addClass('btn help-button btn-secondary')
        .append(
          this.getLabel('writer-info-button'),
          $$(FontAwesomeIcon, { icon: 'fa-question-circle' })
        )
      )
  }
}