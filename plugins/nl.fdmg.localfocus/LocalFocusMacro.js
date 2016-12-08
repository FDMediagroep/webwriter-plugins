export default {

  execute: function(params, context) {
    const editorSession = context.editorSession
    const text = params.text

    if (params.action !== 'break') {
      return
    }

    let match = /^https:\/\/localfocus2\.appspot\.com\/.*$/.exec(text)

    if (match) {
      editorSession.executeCommand('localfocus', {
        url: text
      })
      return true
    }
    return false
  }
}
