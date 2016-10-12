'use strict';

function Textframe() {}

Textframe.prototype.schema = {
    name: "textframe",
    vendor: "nl.fdmg",

    node: require('./TextframeNode'),
    converter: require('./TextframeConverter'),
    component: require('./TextframeComponent'),

    tool: [
        require('./TextframeTool')
    ],

    command: {
        command: require('./TextframeCommand'),
         handlers: [
             {
                 type: 'drop',
                 mimetypes: [
                     'image/jpeg',
                     'image/jpg',
                     'image/gif',
                     'image/png'
                 ]
             },
             {
                 type: 'uri',
                 patterns: 'urlMatchers'
             },
             {
                 type: 'newsItem',
                 itemClasses: ['ninat:picture']
             }
         ]
    }
};

module.exports = Textframe;
