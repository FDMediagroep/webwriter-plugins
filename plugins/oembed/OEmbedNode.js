'use strict';

var BlockNode = require('substance/model/BlockNode');
var channels = require('./OEmbedChannels');
var $ = require('substance/util/jquery');

function OEmbedNode() {
    OEmbedNode.super.apply(this, arguments);

    var data;

    if (arguments.length >= 2) {
        var url = arguments[1].url;

        var channel = channels.find(url);

        if (channel) {
            data = {
                type: 'oembed',
                title: channel.name,
                dataType: 'fdmg/' + channel.type,
                url: url,
                uri: url,
                icon: channel.icon,
                color: channel.color,
                endPoint: channel.endPoint,
                html: '',
            };
        }

    }
    this.loadOEmbed(data);
}

OEmbedNode.Prototype = function() {

    this.getProxy = function() {
        var location = window.location;
        return location.protocol + '//' + location.hostname + ':' + location.port + '/api/proxy';
    }

    this.loadOEmbed = function(data) {
        if (typeof(data) === 'undefined') data = {
            'endPoint': this.endPoint,
            'url': this.url
        };

        var apiUrl = data.endPoint + data.url;
        var endPoint = this.getProxy() + '?url=' + encodeURIComponent(apiUrl);

        $.ajax({
            url: endPoint,
            dataType: 'json'
        }).done(function(json) {
            this.updateNode(json, data);
        }.bind(this)).fail(function(xhr, err) {
            console.error('Failed to load oembed:', err)
        });
    };

    this.updateNode = function(oembedInformation, data) {
        this.html = oembedInformation.html;
        this.oembedColor = data.color;
        this.oembedIcon = data.icon;
        this.oembedTitle = data.title;

        this.emit('oembednode:changed');
    };

    this.triggerChange = function() {
        this.loadOEmbed();
    };
};

BlockNode.extend(OEmbedNode);

OEmbedNode.static.defineSchema({
    title: { type: 'string', optional: true },
    dataType: { type: 'string', optional: true },
    url: { type: 'string', optional: true },
    uri: { type: 'string', optional: true },
    icon: { type: 'string', optional: true },
    color: { type: 'string', optional: true },
    endPoint: { type: 'string', optional: true },
    html: { type: 'string', optional: true }
});

module.exports = OEmbedNode;
