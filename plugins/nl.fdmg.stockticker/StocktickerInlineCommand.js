import {EditInlineNodeCommand} from 'substance';

export default class StocktickerInlineCommand extends EditInlineNodeCommand {
  getCommandState(params) {
    const sel = params.selection;
    const newState = {
      disabled: true,
      active: false
    };

    const annos = this._getAnnotationsForSelection(params);
    if (annos.length === 1 && annos[0].getSelection().equals(sel)) {
      newState.disabled = false;
      newState.node = annos[0];
    }

    return newState;
  }
}
