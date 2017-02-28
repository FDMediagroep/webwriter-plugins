import {Component} from 'substance';
import TagItem from './TagItemComponent';

class TagsListComponent extends Component {
  render($$) {
    const existingTags = this.props.existingTags;
    return $$('ul')
      .addClass('tag-list')
      .append(existingTags.map(tag =>
        $$(TagItem, {
          tag: tag,
          removeTag: this.removeTag.bind(this)
        })
        .ref('tag-' + tag.uuid)
      ))
  }

  removeTag(tag) {
    delete this.refs['tag-' + tag.uuid];
    this.props.removeTag(tag)
  }
}

export default TagsListComponent;
