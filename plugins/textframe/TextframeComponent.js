'use strict';

var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');

function TextframeComponent() {
    TextframeComponent.super.apply(this, arguments);

    this.props.node.connect(this, {
        'textframe:progress': this.updateProgress,
        'textframe:changed': this.updateRender
    });
}

TextframeComponent.Prototype = function () {

    this.dispose = function () {
        if (this.ajaxRequest) {
            this.ajaxRequest.abort();
        }

        Component.prototype.dispose.call(this);
    };

    this.render = function () {
        if (!this.props.node.url && this.props.node.uuid) {
            this.fetchUrl();
            return $$('div');
        }


        var el = $$('div').append([
            $$('span').addClass('header').append([
                $$('strong').attr('contenteditable', 'false').append(this.context.i18n.t('Textframe')),
                $$('span').addClass('remove-button').append($$(Icon, {icon: 'fa-remove'})).on(
                    'click', this.removeTextframe).attr('title',
                    this.context.i18n.t('Remove from article')),
                $$('span').addClass('upload-button').append($$(Icon, {icon: 'fa-upload'})).on(
                    'click', this.triggerFileDialog).attr('title',
                    this.context.i18n.t('Upload image'))
            ]),
            this.renderImage(),
        ])
            .addClass('textframe');

        if (this.props.node.url || this.props.node.previewUrl) {
          el.append(
            $$(TextProperty, {
              tagName: 'div',
              path: [this.props.node.id, 'subject'],
              doc: this.props.doc
            }).ref('subject').addClass('textframe-subject')
          );
        }

        el.append(
            $$(TextProperty, {
                tagName: 'div',
                path: [this.props.node.id, 'title'],
                doc: this.props.doc
            }).ref('caption').addClass('textframe-title')
        );

        el.append(
          $$(TextProperty, {
            tagName: 'div',
            path: [this.props.node.id, 'text'],
            doc: this.props.doc
          }).ref('textframetext').addClass('textframe-text')
        );

        el.addClass('x-im-droppable');
        el.on(
            'drop',
            function (evt) {
                evt.stopPropagation();
                evt.preventDefault();
                this.handleDrop(evt);
            }.bind(this)
        );

        el.append(
            $$('input')
                .attr('type', 'file')
                .attr('multiple', 'multiple')
                .attr('id', 'textframe-fileupload')
                .on('change', this.triggerFileUpload)
        );


        return el;
    };

    this.triggerFileDialog = function () {
        $('#textframe-fileupload').click();
    };

    this.triggerFileUpload = function(ev) {
        var surface = this.context.controller.getSurface('body');
        surface.executeCommand('textframe', {type:'file', data:ev.target.files, context:{nodeId: this.props.node.id}});
    };

    this.handleDrop = function (evt) {
        var surface = this.context.controller.getSurface('body');
        if (surface) {
            this.context.api.handleDrop(surface, evt, 'textframe', {nodeId: this.props.node.id});
        }

        return false;
    };

    this.fetchUrl = function () {
        this.context.api.router.get('/api/image/url/' + this.props.node.uuid + '/450')
            .done(function (url) {
                this.props.node.setUrl(url);
                this.rerender();
            }.bind(this))
            .error(function (error, xhr, text) {
                // TODO: Display error message
                console.error(error, xhr, text);
            }.bind(this));
    };

    this.updateRender = function () {
        this.rerender();
        this.updateProgress();
    };

    /**
     * Update progress bar, hide when reaching 100%
     */
    this.updateProgress = function () {
        var progressbar = this.refs.progressbar;
        if (!progressbar) {
            return;
        }

        progressbar.val(this.props.node.progress);

        if (this.props.node.progress == 100) {
            progressbar.addClass('textframe-done');

            if (this.refs.previewimg) {
                this.refs.previewimg.removeClass('textframe-preview');
            }

            var container = this.refs.imgcontainer;
            container.addClass('textframe-blink');
            setTimeout(function () {
                container.removeClass('textframe-blink');
            }, 1000);
        }
    };

    /**
     * Render image
     */
    this.renderImage = function () {
        if (!this.props.node.previewUrl && !this.props.node.url && !this.props.node.uuid) {
            return $$('span');
        }

        var imgcontainer = $$('div'),
            img = $$('img').ref('img'),
            previewImg = $$('img').ref('previewimg');

        // Render preview if exists
        if (!this.props.node.url && this.props.node.previewUrl) {
            previewImg.attr('src', this.props.node.previewUrl);

            if (this.props.node.progress < 100) {
                previewImg.addClass('textframe-preview');
            }
            imgcontainer.append(previewImg);

            img.addClass('textframe-orig');
        }

        // Render real image if exists
        if (this.props.node.url) {
            img.attr('src', this.props.node.url);
            imgcontainer.append(img);
        }

        imgcontainer.append([
            this.renderImageRemoveButton(),
            this.renderSoftcropIndication(),
            this.renderToolbar()
        ])
        .attr('contenteditable', false)
        .ref('imgcontainer');

        var progressbar = this.renderProgressbar();
        if (progressbar) {
            imgcontainer.append(progressbar);
        }

        return imgcontainer;
    };

    /**
     * Render soft crop indication
     */
    this.renderSoftcropIndication = function() {
        if (this.props.node.crops && this.props.node.crops.original) {
            return $$('a').append(
                $$(Icon, {icon: "fa-crop"})
            ).addClass('x-im-softcropindicator');
        }
        else {
            return $$('span');
        }
    };

    /**
     * Render remove icon
     */
    this.renderImageRemoveButton = function() {
        return $$('a').append(
            $$(Icon, {icon: "fa-remove"})
        ).on('click', this.removeImage)
        .addClass('x-im-removeimage');
    };

    /**
     * Render toolbar
     */
    this.renderToolbar = function () {
        var toolbar = $$('div')
            .addClass('textframe-toolbar')
            .attr('contenteditable', false);

        if (this.context.api.getConfigValue('textframe', 'enablesoftcrop')) {
            toolbar.append(
                $$('a').append(
                    $$(Icon, {icon: "fa-crop"})
                ).on('click', this.openCropDialog)
            );
        }

        toolbar.append([
            $$('a').append(
                $$(Icon, {icon: "fa-image"})
            ).on('click', this.openImageData)
        ]);

        return toolbar;
    };

    /**
     * Remove full textframe
     */
    this.removeTextframe = function () {
        this.context.api.deleteNode('textframe', this.props.node);
    };

    /**
     * Remove the image from the textframe
     */
    this.removeImage = function () {
        this.props.node.removeImage();
    };

    /**
     * Render progress
     * <progress class="progress progress-striped progress-info" value="50" max="100">50%</progress>
     */
    this.renderProgressbar = function () {
        var progressValue = this.props.node.progress;

        return $$('progress')
            .addClass('progress')
            .val(progressValue)
            .attr('max', 100)
            .text(progressValue)
            .ref('progressbar');
    };

    /**
     * Open image Dialog
     */
    this.openImageData = function () {
        this.context.api.router.get('/api/newsitem/' + this.props.node.uuid, {imType: 'x-im/image'})
            .done(function (newsItem) {
                this.context.api.showDialog(
                    require('writer/components/dialog-image/DialogImageComponent'),
                    {
                        url: this.props.node.url,
                        newsItem: newsItem
                    },
                    {
                        title: this.context.i18n.t('Image archive information'),
                        primary: this.context.i18n.t('Save'),
                        secondary: this.context.i18n.t('Close')
                    }
                );
            }.bind(this))
            .error(function (error, xhr, text) {
                // TODO: Display error message
                console.error(error, xhr, text);
            }.bind(this));
    };

    /**
     * Open crop dialog
     */
    this.openCropDialog = function() {
        var img = this.refs['img'].el;
        if (!img) {
            return;
        }

        var tertiary = false;
        if (this.props.node.crops.original) {
            tertiary = [{
                caption: this.context.i18n.t('Remove'),
                callback: function() {
                    this.props.node.setSoftcropData([]);
                    return true;
                }.bind(this)
            }];
        }

        this.context.api.showDialog(
            require('./XimimageSoftcropComponent'),
            {
                src: img.src,
                width: this.props.node.width,
                height: this.props.node.height,
                crops: this.props.node.crops,
                callback: this.setSoftcropData.bind(this)
            },
            {
                tertiary: tertiary
            }
        );
    };

    /**
     * Set softcrop data in node
     */
    this.setSoftcropData = function(softcropData) {
        this.props.node.setSoftcropData(softcropData);
    };
};

Component.extend(TextframeComponent);

module.exports = TextframeComponent;
