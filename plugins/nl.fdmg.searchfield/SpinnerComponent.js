import {Component} from 'substance'

class SpinnerComponent extends Component {
  render($$) {
    const el = $$('i').addClass('fa fa-spinner fa-pulse form__search--spinner');
    if (this.props.isSearching) {
      el.addClass('active');
    }
    return el;
  }
}

export default SpinnerComponent;
