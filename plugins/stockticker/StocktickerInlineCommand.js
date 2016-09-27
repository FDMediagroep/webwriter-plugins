'use strict';
var AnnotationCommand = require('substance/ui/AnnotationCommand');
var docHelpers = require('substance/model/documentHelpers');
function StocktickerInlineCommand() {
  StocktickerInlineCommand.super.apply(this, arguments);
}
StocktickerInlineCommand.Prototype = function() {
  this.getCommandState = function() {
    var sel = this.getSelection();
    var doc = this.getDocument();
    var surface = this.getSurface();
    var newState = {
      disabled: true,
      active: false
    };
    function getActiveAnnotation(type) {
      return docHelpers.getAnnotationsForSelection(doc, sel, type, 'body')[0];
    }
    if (surface.name !== 'body') return;
    if (sel.isNull() || !sel.isPropertySelection()) return;
    var stocktickerAnnotation = getActiveAnnotation('stockticker');
    if (stocktickerAnnotation && stocktickerAnnotation.getSelection().equals(sel)) {
      newState.disabled = false;
      newState.active = true;
      newState.focused = true;
      newState.annotationId = stocktickerAnnotation.id;
    }
    return newState;
  }
}
AnnotationCommand.extend(StocktickerInlineCommand);
StocktickerInlineCommand.static.name = 'stockticker-inline';
StocktickerInlineCommand.static.annotationType = 'stockticker';
module.exports = StocktickerInlineCommand;
