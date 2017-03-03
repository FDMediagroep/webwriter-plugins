import {Component, FontAwesomeIcon} from 'substance';

class AuthorItemComponent extends Component {
  render($$) {
    const authorItem = $$('li')
      .addClass('authors__list-item clearfix')
      .on('mouseenter', this.showHover)
      .on('mouseleave', this.hideHover)
      .ref('authorItem');

    const displayTitle = this.props.author.title;

    const deleteButton = $$('button')
      .addClass('author__button--delete')
      .append($$(FontAwesomeIcon, {icon: 'fa-times'}))
      .attr('title', this.getLabel('Remove from article'))
      .on('click', () => {
        this.props.removeAuthor(this.props.author)
      });

    this.populateElementsForSimpleAuthor($$, authorItem, displayTitle, deleteButton);

    return authorItem;
  }

  populateElementsForSimpleAuthor($$, authorItem, displayTitle, deleteButton) {
    authorItem.append(
      $$('div')
        .addClass('avatar__container')
        .append($$(FontAwesomeIcon, {icon: 'fa-user'})),
        $$('div').addClass('metadata__container').append($$('span').addClass('author__name notClickable meta').append(displayTitle)),
        $$('div').addClass('button__container').append(deleteButton)
    )
  }

  showHover() {
    const deleteButton = this.el.find('.author__button--delete');
    deleteButton.addClass('active');
  }

  hideHover() {
    const deleteButton = this.el.find('.author__button--delete');
    deleteButton.removeClass('active');
  }
}

export default AuthorItemComponent;
