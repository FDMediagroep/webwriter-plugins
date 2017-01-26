import {Component} from 'substance'
import {NilUUID} from 'writer'
import AuthorItem from './AuthorItemComponent'

class AuthorListComponent extends Component {
  render($$) {
    const existingAuthors = this.props.existingAuthors
    return $$('ul')
      .addClass('authors__list')
      .append(existingAuthors.map(author =>
        $$(AuthorItem, {
          author: author,
          removeAuthor: this.deleteAuthorAndReference.bind(this)
        })
        .ref(this.getIdForRef(author))
      ))
  }

  getIdForRef(author) {
    if (NilUUID.isNilUUID(author.uuid)) {
      return 'author-' + author.title.replace(' ', '')
    } else if (author.uuid) {
      return 'author-' + author.uuid
    } else {
      console.warn('No UUID')
    }
  }

  deleteAuthorAndReference(author) {
    delete this.refs[this.getIdForRef(author)]
    this.props.removeAuthor(author)
  }
}

export default AuthorListComponent
