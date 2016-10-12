'use strict';

var Component = require('substance/ui/Component');
var $$ = Component.$$;

function XimimageSoftcropComponent() {
    XimimageSoftcropComponent.super.apply(this, arguments);
    this.cropEditor = null;
}

XimimageSoftcropComponent.Prototype = function() {
    this.dispose = function() {
        Component.prototype.dispose.call(this);
    };

    this.didMount = function() {
        var div = document.getElementById('ximimage__softcrop');

        div.classList.add('open');

        this.cropEditor = new IMSoftcrop.Editor( // jshint ignore:line
            'ximimage__softcrop',
            {
                autocrop: true,
                detectWorkerUrl: 'node_modules/cropjs/dist/js/imcrop.worker.detect.js',
                detectThreshold: 30,
                detectStepSize: 3,
                debug: false
            }
        );

        var definedCrops = this.context.api.getConfigValue('ximimage', 'crops', []),
            encodedSrc = encodeURIComponent(this.props.src);

        this.cropEditor.addImage(
            '/api/resourceproxy?url=' + encodedSrc,
            function() {
                var selected = true;
                for(var name in definedCrops) {
                    if (this.props.crops && this.props.crops.original) {
                        this.addCrop(name, selected, definedCrops[name], this.props.crops.original);
                    }
                    else {
                        this.createCrop(name, selected, definedCrops[name]);
                    }
                    selected = false;
                }
            }.bind(this)
        );
    };

    this.addCrop = function(name, selected, definedCrop, existingCrops) {
        var existingCrop = null;
        for (var n = 0; n < existingCrops.crops.length; n++) {
            if (existingCrops.crops[n].name == name) {
                existingCrop = existingCrops.crops[n];
                break;
            }
        }

        if (!existingCrop) {
            console.warn('Existing crop ' + name + ' not defined in configuration. Ignoring!');
            this.createCrop(name, selected, definedCrop);
            return;
        }

        this.cropEditor.addSoftcrop(
            name,
            selected,
            existingCrop.width,
            existingCrop.height,
            existingCrop.x,
            existingCrop.y
        );
    };

    this.createCrop = function(name, selected, definedCrop) {
        this.cropEditor.addSoftcrop(
            name,
            selected,
            definedCrop[0],
            definedCrop[1]
        );
    };

    this.render = function() {
        return $$('div').attr('id', 'ximimage__softcrop');
    };

    this.onClose = function(mode) {
        if (mode == 'cancel') {
            return;
        }

        var data = this.cropEditor.getSoftcropData(),
            crops = {
                original: {
                    crops: []
                }
            },
            maxWidth = this.context.api.getConfigValue('ximimage', 'publishedmaxwidth', null);

        // Add crop data for original image size
        for (var n in data.crops) {
            crops.original.crops.push({
                name: data.crops[n].id,
                x: data.crops[n].x,
                y: data.crops[n].y,
                width: data.crops[n].width,
                height: data.crops[n].height
            });
        }

        if (maxWidth && maxWidth < this.props.width) {
            // Add downsized crop sizes for downsized/published image
            var factor = maxWidth / this.props.width,
                pubHeight = Math.floor(this.props.height * factor);

            crops.published = {
                width: maxWidth,
                height: pubHeight,
                crops: []
            };

            for (n in data.crops) {
                var cropX = Math.floor(data.crops[n].x * factor),
                    cropY = Math.floor(data.crops[n].y * factor),
                    cropWidth = Math.ceil(data.crops[n].width * factor),
                    cropHeight = Math.ceil(data.crops[n].height * factor);

                if (cropWidth > maxWidth) {
                    cropWidth = maxWidth;
                }

                if (cropHeight > pubHeight) {
                    cropHeight = pubHeight;
                }

                crops.published.crops.push({
                    name: data.crops[n].id,
                    x: cropX,
                    y: cropY,
                    width: cropWidth,
                    height: cropHeight
                });
            }
        }

        this.props.callback(crops);
    };
};

Component.extend(XimimageSoftcropComponent);
module.exports = XimimageSoftcropComponent;
