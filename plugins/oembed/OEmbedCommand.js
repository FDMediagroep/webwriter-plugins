'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');
var channels = require('./OEmbedChannels');

function OEmbedCommand() {
    OEmbedCommand.super.apply(this, arguments);
}

OEmbedCommand.Prototype = function() {

    this.execute = function(url) {
        console.log('execute')
        this.createNode(url);
        return true;
    }

    this.createNode = function(url) {
        var channel = channels.find(url);

        if (channel) {
            var data = {
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

            return this.context.api.insertBlockNode(data.type, data);
        } else {
            log.error('Cannot find a channel for "' + url + '", should never happen');
        }
    };

};

BlockContentCommand.extend(OEmbedCommand);
OEmbedCommand.static.name = 'oembed';
module.exports = OEmbedCommand;
