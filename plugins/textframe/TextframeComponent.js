'use strict';

var Component = require('substance/ui/Component');
var TextProperty = require('substance/ui/TextPropertyComponent');
var $$ = Component.$$;
var Icon = require('substance/ui/FontAwesomeIcon');
var $ = require('substance/util/jquery');

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
      return $$('a');
    }

    var el = $$('a')
      .addClass('textframe')
      .addClass('fdmg-box')
      .addClass('x-im-droppable')
      .append([
        $$('div')
          .addClass('header')
            .append(this.context.i18n.t('Textframe'))
            .attr('contenteditable', 'false')
          .append([
            $$('span').addClass('remove-button')
              .append($$(Icon, {icon: 'fa-remove'}))
              .attr('title', this.context.i18n.t('Remove from article'))
              .on('click', this.removeTextframe),

            $$('span')
              .addClass('upload-button')
              .append($$(Icon, {icon: 'fa-upload'}))
              .attr('title', this.context.i18n.t('Upload image'))
              .on('click', this.triggerFileDialog)
          ]),

          this.renderImage(),

          $$(TextProperty, {
            tagName: 'div',
            path: [this.props.node.id, 'title'],
            doc: this.props.doc
          })
            .addClass('textframe-title')
            .attr({'contentEditable' : true, "data-text" : this.context.i18n.t('Title')})
            .ref('caption'),

          $$(TextProperty, {
            tagName: 'div',
            path: [this.props.node.id, 'text'],
            doc: this.props.doc
          })
            .addClass('textframe-text')
            .attr({'contentEditable' : true, "data-text" : this.context.i18n.t('Text')})
            .ref('textframetext')
      ])
      .attr('contentEditable', false)
      .on('drop', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.handleDrop(evt);
      }.bind(this));

    this.context.api.handleDrag(el, this.props.node);

    // Cannot click an element when handleDrag is used
    // Circumvent this by adding the `input` outside the `a`
    var container = $$('div')
      .append(
        el,
        $$('input')
          .attr('type', 'file')
          .attr('multiple', 'multiple')
          .attr('id', 'textframe-fileupload')
          .on('change', this.triggerFileUpload)
      );

    return container;
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

    imgcontainer
      .append([
        this.renderImageRemoveButton()
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
   * Render remove icon
   */
  this.renderImageRemoveButton = function() {
    return $$('a')
      .addClass('x-im-removeimage')
      .append($$(Icon, {icon: "fa-remove"}))
      .on('click', this.removeImage);
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
};

Component.extend(TextframeComponent);

module.exports = TextframeComponent;
