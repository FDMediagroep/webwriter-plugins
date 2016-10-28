'use strict'

const SurfaceTool = require('substance/ui/SurfaceTool')
const $$ = require('substance/ui/Component').$$

function ImagesearchTool() {
	ImagesearchTool.super.apply(this, arguments)
}

ImagesearchTool.Prototype = function() {
	this.render = function() {
		return $$('button')
			.addClass('se-tool')
			.append($$('i').addClass('fa fa-meh-o'))
			.on('click', this.showDialog)
	}

	this.showDialog = function() {
		this.context.api.showDialog(
			require('./ImagesearchDialog'),
      {
        resultsPerPage: this.context.api.getConfigValue('imagesearch', 'resultsPerPage', 100),
				reloadScrollThreshold: this.context.api.getConfigValue('imagesearch', 'reloadScrollThreshold', 100)
      },
      {
        global: true,
        primary: false,
        center: true,
				title: this.context.api.i18n.t('Image Search')
			}
		)
	}
}

SurfaceTool.extend(ImagesearchTool)
ImagesearchTool.static.name = 'imagesearch'
ImagesearchTool.static.command = 'imagesearch'
module.exports = ImagesearchTool
