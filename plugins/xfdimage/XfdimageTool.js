'use strict'

const SurfaceTool = require('substance/ui/SurfaceTool')
const $$ = require('substance/ui/Component').$$
const Dialog = require('./XfdimageDialog')

function XfdimageTool() {
  XfdimageTool.super.apply(this, arguments)
}

XfdimageTool.Prototype = function() {

  this.render = function() {
    return $$('button')
      .addClass('se-tool')
      .append($$('i').addClass('fa fa-search'))
      .on('click', this.openDialog)
  }

  this.openDialog = function() {
    this.context.api.showDialog(
      Dialog,
      {
        reloadScrollThreshold: this.context.api.getConfigValue('xfdimage', 'reloadScrollThreshold', 100)
      },
      {
        global: true,
        primary: false,
        center: true,
        title: this.context.i18n.t('Image search')
      }
    )
  }
}

SurfaceTool.extend(XfdimageTool)
XfdimageTool.static.name = 'xfdimage'
XfdimageTool.static.command = 'xfdimage'
module.exports = XfdimageTool
