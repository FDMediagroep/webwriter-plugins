import {Component, FontAwesomeIcon} from 'substance';

class LocalFocusComponent extends Component {
  render($$) {
    const iframe = `<iframe class="localfocusvisual" frameborder="0" style="width:100%; height:500px; overflow:hidden" src="${this.props.node.url}"></iframe>`;
    return $$('div')
      .addClass('im-blocknode__container')
      .addClass('localfocus')
      .attr({contenteditable: false})
      .append(
        $$('div')
        .append(
          $$('div')
          .attr({contenteditable: false})
          .addClass('header')
          .append(
            $$(FontAwesomeIcon, {icon: 'fa-pie-chart'}),
            $$('strong').attr({contenteditable: false}).append('LocalFocus')
          ),
          $$('div')
          .addClass('embedContent')
          .html(iframe)
          .ref('embedContent')
        )
        .ref('embed-container')
    )
  }
}

LocalFocusComponent.noStyle = true;

export default LocalFocusComponent
