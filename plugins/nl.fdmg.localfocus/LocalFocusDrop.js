import {DragAndDropHandler} from 'substance';

class LocalFocusDrop extends DragAndDropHandler {
  match(params) {
    return (params.type === 'uri' && params.uri.indexOf('localfocus2.appspot.com') > 0);
  }

  drop(tx, params) {
    tx.insertBlockNode({
      type: 'localfocus',
      dataType: 'fdmg/localfocus',
      url: params.uri
    });
  }
}

export default LocalFocusDrop;
