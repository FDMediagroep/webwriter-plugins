# Getting started guide

1. Clone `NPWriter`: `https://github.com/Infomaker/NPWriter.git`
1. Clone FDMediagroep `webwriter-plugins` A.K.A. `NPWriterDevKit`: `https://github.com/FDMediagroep/webwriter-plugins`
1. Use branch `writer3` on `webwriter-plugins`
1. Copy `webwriter-plugins/writer-fd-dev.json` to `NPWriter/server/config`
1. Getting started guide: https://infomaker.github.io/NPWriterDevelopers/getting-started/
1. Install NodeJS 6.9.1 or later
  1. For Windows: Install Visual Studio 2013 Express first
  1. npm install
  1. npm run build-dep
  1. npm run dev
1. run `CONFIG_FILE=writer-fd-dev.json npm run dev` in `NPWriter/`
  1. For Windows use `set CONFIG_FILE=writer-fd-dev.json&npm run dev` instead
1. Navigate to `webwriter-plugins` and run `npm install`
1. Then run `npm run dev` in `webwriter-plugins` to run the `NPWriterDevKit`
1. Open `localhost:5000` in a browser

In other sessions you only need to:

1. start Webwriter by calling `CONFIG_FILE=writer-fd-dev.json npm run dev` in `NPWriter/`
1. and run `npm run dev` to start the `NPWriterDevKit`/`webwriter-plugins` for plugin development and enable change watch

# Rewrite `ContentItem` plugin from Writer to Writer 3
1. Set your IntelliJ (or any other poison of your choice) editor settings indentation to exactly 2 spaces (no tab).
1. Update status in `https://docs.google.com/spreadsheets/d/1DWcKYwYq8LVKjwDNPUj8BGUef2ykQKXon6lM1FDxoRI/edit?ts=58412e69#gid=0`
1. Create folder with the following naming convention: `nl.fdmg.<plugin name>`
1. Create the necessary file: `index.js`
1. Create <PackageName>Package.js and import this in the `index.js`
1. `this.render` property becomes the function `render($$)`
1. Replace `Icon` by `FontAwesomeIcon` i.e: `$$(Icon, {icon: 'fa-quote-left'})` becomes `$$(FontAwesomeIcon, {icon: 'fa-quote-left'})`
1. Replace `this.context.i18n.t` by `this.getLabel` 
1. Replace `this.context.api.on` by `this.context.api.events.on`
1. Replace `TextPropertyComponent` by `TextPropertyEditor`
1. Register the plugin in the `index.js` in the plugin root directory of `webwriter-plugins/plugins`
1. Add plugin entry in `webwriter-fd-dev.json`
```json
        {
            "id": "nl.fdmg.<plugin>",
            "name": "<plugin>",
            "url": "http://localhost:3000/index.js",
            "enabled": true,
            "mandatory": true
        }
```
## Rinse and repeat
1. Copy `webwriter-plugins/writer-fd-dev.json` to `NPWriter/server/config`
1. Restart `Webwriter` and `NPWriterDevKit`/`webwriter-plugins`

# Rewrite `ContextItem` plugin from Writer to Writer 3
### TODO...

# Rewrite `Meta` plugin from Writer to Writer 3
### TODO...
