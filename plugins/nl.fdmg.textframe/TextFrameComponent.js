import {Component, FontAwesomeIcon, TextPropertyEditor} from 'substance';

export default class TextFrameComponent extends Component {

  constructor() {
    super(arguments);
    /*this.props.node.connect(this, {
      'textframe:progress': this.updateProgress,
      'textframe:changed': this.updateRender
    });*/
  }

  dispose() {
    if (this.ajaxRequest) {
      this.ajaxRequest.abort();
    }

    Component.prototype.dispose.call(this);
  }

  render($$) {
    console.log(this.props);
    if (!this.props.node.url && this.props.node.uuid) {
      this.fetchUrl();
      return $$('div');
    }

    let el = $$('a')
      .addClass('textframe')
      .addClass('fdmg-box')
      .addClass('x-im-droppable')
      .append([
        $$('div')
          .addClass('header')
          .append(this.getLabel('Textframe'))
          .attr('contenteditable', 'false')
          .append([
            $$('span')
              .addClass('upload-button')
              .append($$(FontAwesomeIcon, {icon: 'fa-upload'}))
              .attr('title', this.getLabel('Upload image'))
              .on('click', () => this.triggerFileDialog($$))
          ]),

        this.renderImage($$),

        $$(TextPropertyEditor, {
          tagName: 'div',
          path: [this.props.node.id, 'title'],
          doc: this.props.doc
        })
          .addClass('textframe-title')
          .attr({'contentEditable' : true, "data-text" : this.getLabel('Title')})
          .ref('caption'),

        $$(TextPropertyEditor, {
          tagName: 'div',
          path: [this.props.node.id, 'text'],
          doc: this.props.doc
        })
          .addClass('textframe-text')
          .attr({'contentEditable' : true, "data-text" : this.getLabel('Text')})
          .ref('textframetext')
      ])
      .attr('contentEditable', false)
      .on('drop', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        this.handleDrop(evt);
      }.bind(this));

    // Add configurable fields
    let fields = this.context.api.getConfigValue('textframe', 'fields');
    fields.forEach(obj => {
      if (obj.type === 'option') {
        el.append(this.renderOptionField($$, obj));
      }
      else {
        el.append(this.renderTextField(obj))
      }
    });

    this.context.api.handleDrag(el, this.props.node);

    // Cannot click an element when handleDrag is used
    // Circumvent this by adding the `input` outside the `a`
    let container = $$('div')
      .append(
      el,
      $$('input')
        .attr('type', 'file')
        .attr('multiple', 'multiple')
        .attr('id', 'textframe-fileupload')
        .on('change', this.triggerFileUpload)
    );

    return container;
  }

  triggerFileDialog($$) {
    $$('#textframe-fileupload').click();
  }

  triggerFileUpload(ev) {
    let surface = this.context.controller.getSurface('body');
    surface.executeCommand('textframe', {type:'file', data:ev.target.files, context:{nodeId: this.props.node.id}});
  }

  handleDrop(evt) {
    let surface = this.context.controller.getSurface('body');
    if (surface) {
      this.context.api.handleDrop(surface, evt, 'textframe', {nodeId: this.props.node.id});
    }

    return false;
  }

  fetchUrl() {
    this.context.api.router.get('/api/image/url/' + this.props.node.uuid + '/450')
      .done(function (url) {
        this.props.node.setUrl(url);
        this.rerender();
      }.bind(this))
      .error((error, xhr, text) => {
        // TODO: Display error message
        console.error(error, xhr, text);
      });
  }

  updateRender() {
    this.rerender();
    this.updateProgress();
  }

  /**
   * Update progress bar, hide when reaching 100%
   */
  updateProgress() {
    let progressbar = this.refs.progressbar;
    if (!progressbar) {
      return;
    }

    progressbar.val(this.props.node.progress);

    if (this.props.node.progress === 100) {
      progressbar.addClass('textframe-done');

      if (this.refs.previewimg) {
        this.refs.previewimg.removeClass('textframe-preview');
      }

      let container = this.refs.imgcontainer;
      container.addClass('textframe-blink');
      setTimeout(function () {
        container.removeClass('textframe-blink');
      }, 1000);
    }
  }

  /**
   * Render image
   */
  renderImage($$) {
    if (!this.props.node.previewUrl && !this.props.node.url && !this.props.node.uuid) {
      return $$('span');
    }

    let imgcontainer = $$('div'),
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
        this.renderImageRemoveButton($$)
      ])
      .attr('contenteditable', false)
      .ref('imgcontainer');

    let progressbar = this.renderProgressbar($$);
    if (progressbar) {
      imgcontainer.append(progressbar);
    }

    return imgcontainer;
  }

  renderOptionField($$, obj) {
    let options = [],
      currentOption = null;

    if (!this.props.node.alignment) {
      currentOption = obj.options[0].name;
      this.props.node.setAlignment(currentOption);
    }
    else {
      currentOption = this.props.node.alignment;
    }

    obj.options.forEach(option => {
      let selectedClass = (currentOption === option.name) ? ' selected' : '';

      options.push(
        $$('em')
          .addClass('fa ' + option.icon + selectedClass)
          .attr({
            'contenteditable': 'false',
            'title': option.label
          })
          .on('click', () => {
            if (option.name !== this.props.node.alignment) {
              this.props.node.setAlignment(option.name);
              this.rerender();
            }
            return false;
          })
      );
    });
    return $$('div')
      .addClass('x-im-image-dynamic x-im-image-alignment')
      .attr({
        'contenteditable': 'false'
      })
      .append(options);
  }

  /**
   * Render remove icon
   */
  renderImageRemoveButton($$) {
    return $$('a')
      .addClass('x-im-removeimage')
      .append($$(FontAwesomeIcon, {icon: "fa-remove"}))
      .on('click', this.removeImage);
  }

  /**
   * Remove full textframe
   */
  removeTextframe() {
    this.context.api.deleteNode('textframe', this.props.node);
  }

  /**
   * Remove the image from the textframe
   */
  removeImage() {
    this.props.node.removeImage();
  }

  /**
   * Render progress
   * <progress class="progress progress-striped progress-info" value="50" max="100">50%</progress>
   */
  renderProgressbar($$) {
    var progressValue = this.props.node.progress;

    return $$('progress')
      .addClass('progress')
      .val(progressValue)
      .attr('max', 100)
      .text(progressValue)
      .ref('progressbar');
  }
}
