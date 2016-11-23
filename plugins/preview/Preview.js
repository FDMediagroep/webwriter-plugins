function Preview() {
}

Preview.prototype.schema = {
  name: 'preview',
  vendor: 'nl.fdmg',
  uicomponents: {
    sidebar: {
      top: [
        require('./PreviewComponent')
      ]
    }
  }
}

module.exports = Preview
