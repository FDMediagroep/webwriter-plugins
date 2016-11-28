'use strict';

var channels = [
    {
        name: 'Twitter',
        type: 'twitter',
        icon: 'fa-twitter',
        color: '#479ae9',
        isApplicableTo: function(url) { return ~url.indexOf('twitter.com'); },
        endPoint: 'https://publish.twitter.com/oembed?width=320&url='
    },
    {
        name: 'Instagram',
        type: 'instagram',
        icon: 'fa-instagram',
        color: '#000',
        isApplicableTo: function(url) { return (~url.indexOf('instagram.com') || ~url.indexOf('instagr.am')); },
        endPoint: 'https://api.instagram.com/oembed?maxwidth=320&url='
    },
    {
        name: 'Soundcloud',
        type: 'soundcloud',
        icon: 'fa-soundcloud',
        color: '#fb3d08',
        isApplicableTo: function(url) { return ~url.indexOf('soundcloud.com'); },
        endPoint: 'https://soundcloud.com/oembed?maxwidth=320&maxheight=150&format=json&url='
    },
    {
        name: 'Vimeo',
        type: 'vimeo',
        icon: 'fa-vimeo',
        'color': '#121d23',
        isApplicableTo: function(url) { return ~url.indexOf('vimeo.com'); },
        endPoint: 'https://vimeo.com/api/oembed.json?maxwidth=320&url='
    },
    {
        name: 'Facebook Post',
        type: 'facebook',
        icon: 'fa-facebook-official',
        color: '#2e4486',
        isApplicableTo: function(url) { return (~url.indexOf('facebook.com') && !~url.indexOf('/video/') && !~url.indexOf('video.php')); },
        endPoint: 'https://www.facebook.com/plugins/post/oembed.json?url='
    },
    {
        name: 'Facebook Video',
        type: 'facebook-video',
        icon: 'fa-facebook-official',
        color: '#2e4486',
        isApplicableTo: function(url) { return (~url.indexOf('facebook.com') && ~url.indexOf('video')); },
        endPoint: 'https://www.facebook.com/plugins/video/oembed.json?url='
    }
];

module.exports = {
    'get': function() { return channels; },
    'find': function(url) {
        for (var i = 0; i < channels.length; i++) {
            var channel = channels[i];
            if (channel.isApplicableTo(url)) return channel;
        }
        return null;
    }
}

// {
// name: '',
// type: '',
// icon: '',
// isApplicableTo: function(url) { return (~url.indexOf('')); },
// endPoint: ''
// }
