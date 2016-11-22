'use strict';

var BlockNode = require('substance/model/BlockNode');

function TextframeNode() {
    TextframeNode.super.apply(this, arguments);
}

TextframeNode.Prototype = function () {
    this.preview = function () {
        this.document.set(
            [this.id, 'url'],
            null
        );

        this.emit('textframe:changed');
    };

    this.setProgress = function (progress) {
        this.progress = progress;
        this.emit('textframe:progress');
    };

    this.setUrl = function (url) {
        this.url = url;
    };

    this.setAlignment = function(alignment) {
        this.document.set([this.id, 'alignment'], alignment);
    };

    this.updateMetaData = function (values) {
        if (values.uuid) {
            this.document.set([this.id, 'uuid'], values.uuid);
        }

        if (values.uri) {
            this.document.set([this.id, 'uri'], values.uri);
        }

        if (values.url) {
            this.document.set([this.id, 'url'], values.url);
        }

        if (values.progress) {
            this.document.set([this.id, 'progress'], values.progress);
        }

        this.emit('textframe:changed');

    };

    this.setInitialMetaData = function (uuid, uri, url) {
        this.progress = 100;

        this.document.set([this.id, 'uuid'], uuid);

        this.document.set([this.id, 'uri'], uri);

        this.document.set([this.id, 'url'], url);

        // Set title, owned by the document
        this.document.set([this.id, 'title'], '');

        // Set subject, owned by the document
        this.document.set([this.id, 'subject'], '');

        // Set text, owned by the document
        this.document.set([this.id, 'text'], '');

        this.document.set([this.id, 'crops'], {});

        this.document.set([this.id, 'alignment'], "");

        this.emit('textframe:changed');
    };

    this.setPreviewImage = function (data) {
        this.progress = 0;
        this.document.set(
            [this.id, 'previewUrl'],
            data
        );
    };

    this.setImage = function (uuid, uri, url) {
        this.progress = 100;

        this.document.set([this.id, 'uuid'], uuid);

        this.document.set([this.id, 'uri'], uri);

        this.document.set([this.id, 'url'], url);

        this.emit('textframe:changed');
    };

    this.removeImage = function () {
        this.progress = 0;

        this.document.set([this.id, 'url'], null);

        this.document.set([this.id, 'uuid'], null);

        this.document.set([this.id, 'uri'], null);

        this.document.set([this.id, 'previewUrl'], null);

        this.emit('textframe:changed');
    };
};

BlockNode.extend(TextframeNode);


TextframeNode.static.defineSchema({
    uuid: {type: 'string', optional: true},
    dataType: {type: 'string', optional: false},

    title: {type: 'string', optional: false, default: ''},
    subject: {type: 'string', optional: false, default: ''},
    text: {type: 'string', optional: false, default: ''},
    alignment: { type: 'string', optional: true },

    previewUrl: {type: 'string', optional: true},
    imageType: {type: 'string', optional: true},
    uri: {type: 'string', optional: true},
    url: {type: 'string', optional: true},
    progress: {type: 'number', default: 100},
    width: {type: 'number', optional: true},
    height: {type: 'number', optional: true},

    crops: { type: 'object', default: [] }
});

module.exports = TextframeNode;
