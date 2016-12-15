import {api} from 'writer'
import WorkinstructionsEditTool from './WorkinstructionsEditTool'

export default (props) => {
  api.ui.showDialog(
    WorkinstructionsEditTool,
    props,
    {
      title: 'Edit workinstruction',
      cssClass: 'im-htmlembed-modal'
    }
  )
}
