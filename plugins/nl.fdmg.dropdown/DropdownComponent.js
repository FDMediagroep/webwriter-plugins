const {Component, FontAwesomeIcon} = substance
const _ = writer.lodash

class DropdownComponent extends Component {

  getInitialState() {
    const selection = this.props.selection || {id: 'default', label: ''}
    const listmode = !(this.props.allowFreeInput && !this.props.items.some(i => selection.label === i.label) && selection.label !== '')

    return {
      listmode,
      selection
    }
  }

  render($$) {
    const toggleButton = $$('button')
      .addClass('input-toggle')
      .append(
        $$(FontAwesomeIcon, {icon: this.state.listmode ? 'fa-pencil' : 'fa-list-ul'})
      ).on('click', this.toggle.bind())

    const items = this.props.items.slice()
    items.unshift({
      id: 'none',
      label: this.getLabel('- no selection -'),
      disabled: !this.props.allowEmptySelection
    })

    const listselect = $$('select')
      .attr(this.props.disabled ? {disabled: 'disabled'} : {})
      .attr({id: 'listselect'})
      .append(
        items.map(i =>
          $$('option')
            .append(i.label)
            .attr({
              'data-id': i.id,
              disabled: i.disabled
            })
            .attr(
              i.disabled || (this.state.selection.label === i.label) ? {selected: 'selected'} : {}
            )
        )
      )
      .ref('listselect')
      .on('change', function() {
        const options = this.refs.listselect.el.el.options
        const option = options[options.selectedIndex]

        this.update({
          id: option.attributes['data-id'].value,
          label: option.value
        })
      }.bind(this))

    const freeinput = $$('input')
      .addClass('form-control free-input')
      .attr(this.props.disabled ? {disabled: 'disabled'} : {})
      .attr({
        type: 'text',
        placeholder: this.getLabel('free input'),
        value: this.state.selection.id !== 'none' ? this.state.selection.label : ''
      })
      .ref('freeinput')
      .on('blur', () => {
        const label = this.refs.freeinput.val()
        const id = this.findIdForLabel(label, 'unknown')

        this.update({
          id,
          label,
          freeinput: true
        })
      })

    const showlist = this.state.listmode || !this.props.allowFreeInput
    const body = showlist ? listselect : freeinput

    return $$('div')
      .addClass('fdmg-sidebar')
      .append(
        $$('div')
          .addClass('header')
          .append(
            $$('h2').append(this.props.header),
            this.props.allowFreeInput ? toggleButton : ''
          ),
        $$('div')
          .addClass('form-group')
          .append(body)
      )
  }

  toggle() {
    this.extendState({listmode: !this.state.listmode})
  }

  update(selection) {
    if (!_.isEqual(this.state.selection, selection)) {
      if (this.props.onSelect) {
        this.props.onSelect(selection)
      }
      this.extendState({selection})
    }
  }

  findIdForLabel(label, orElse = -1) {
    const item = this.props.item.find(i => i.label === label)
    if (item !== undefined) {
      return item.id
    }
    return orElse
  }
}

export default DropdownComponent
