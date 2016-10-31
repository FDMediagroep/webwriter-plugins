'use strict';

function Comments() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Comments.prototype.schema = {
    
    name: 'comments',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            extra: [
                require('./CommentsComponent')
            ]
        }
    }

};

module.exports = Comments;
