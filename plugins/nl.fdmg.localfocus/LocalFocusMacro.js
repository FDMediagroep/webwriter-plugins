export default {
  execute: function(params, context) {
    let editorSession = context.editorSession
    let text = params.text
      // only react on 'break' (as medium does)
    if (params.action === 'break' || params.action === 'paste') {
      // only react of we find a HTTP URL
      let match = /^\s*(https?:\/\/([^\s]+))\s*$/.exec(text)
      if (!match) return
        // take the url, select the node, and run the localfocus command
      let url = match[1]

      if (url.indexOf('localfocus') > 0) {
        editorSession.executeCommand('localfocus', {
          url: url,
          isPaste: true
        })
        return true
      }
    }
  }
}