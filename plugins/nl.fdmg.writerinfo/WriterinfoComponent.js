import { Component, FontAwesomeIcon } from 'substance';
import { api } from 'writer';


export default class WriterinfoComponent extends Component {

  render($$) {
    return $$('div')
      .addClass('fdmg-sidebar writer-info')
      .append(
        $$('a')
        .attr({
          'href': '#',
          'target': '_blank',
          'class': 'help-button'
        })
        .append(
          this.getLabel('Hulp A4tje'),
          $$(FontAwesomeIcon, { icon: 'fa-question-circle' })
        )
      )
  }

}