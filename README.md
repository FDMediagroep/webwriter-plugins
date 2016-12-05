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