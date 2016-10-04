'use strict';

var AnnotationCommand = require('substance/ui/AnnotationCommand');
var docHelpers = require('substance/model/documentHelpers');

function StocktickerInlineCommand() {
  StocktickerInlineCommand.super.apply(this, arguments);
  this.name = 'stockticker';
}

StocktickerInlineCommand.Prototype = function() {

  this.getCommandState = function() {
    var sel = this.getSelection();
    var doc = this.getDocument();
    var surface = this.getSurface();

    if (sel.isNull() || !sel.isPropertySelection() || surface.name !== 'body') {
      return;
    }

    var stocktickerAnnotation = getActiveAnnotation(this.name);

    if (stocktickerAnnotation && stocktickerAnnotation.getSelection().equals(sel)) {
      return {
        disabled: false,
        active: true,
        focused: true,
        annotationId: stocktickerAnnotation.id
      };
    } else {
      return {
        disabled: true,
        active: false
      };
    }

    function getActiveAnnotation(type) {
      return docHelpers.getAnnotationsForSelection(doc, sel, type, 'body')[0];
    }
  }
};

AnnotationCommand.extend(StocktickerInlineCommand);

StocktickerInlineCommand.static.name = 'stockticker-inline';
StocktickerInlineCommand.static.annotationType = 'stockticker';

module.exports = StocktickerInlineCommand;
