'use strict';

function Imagesearch() {}

Imagesearch.prototype.schema = {
	name: 'imagesearch',
	vendor: 'nl.fdmg',

	tool: [require('./ImagesearchTool')],
	command: require('./ImagesearchCommand')
};

module.exports = Imagesearch;
