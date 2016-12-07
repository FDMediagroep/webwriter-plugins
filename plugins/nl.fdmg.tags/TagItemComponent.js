import {Component, FontAwesomeIcon} from 'substance'

class TagItemComponent extends Component {
  render($$) {
    return $$('li')
      .addClass('tag-list__item')
      .append(
        $$('span')
          .addClass('tag-item__title tag-item__title--no-avatar tag-item__title--notexisting')
          .attr({title: this.props.tag.title})
          .append(this.props.tag.title)
          .on('mouseenter', this.showHover)
          .on('mouseleave', this.hideHover),
        $$('span')
          .append(
            $$(FontAwesomeIcon, {icon: 'fa-times'})
              .attr({title: this.getLabel('Remove from article')})
              .addClass('tag-icon tag-icon--delete')
          )
          .on('click', () => {
            this.props.removeTag(this.props.tag)
          })
      )
      .ref('tagItem')
  }

  showHover() {
    const deleteButton = this.el.find('.tag-icon--delete')
    deleteButton.addClass('active')
  }

  hideHover() {
    const deleteButton = this.el.find('.tag-icon--delete')
    deleteButton.removeClass('active')
  }
}

export default TagItemComponent
