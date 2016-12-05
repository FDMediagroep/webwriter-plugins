# Clone `NPWriter`: `https://github.com/Infomaker/NPWriter.git`
# Clone FDMediagroep `webwriter-plugins` A.K.A. `NPWriterDevKit`: `https://github.com/FDMediagroep/webwriter-plugins`
# Use branch `writer3` on `webwriter-plugins`
# Copy `webwriter-plugins/writer-fd-dev.json` to `NPWriter/server/config`
# Getting started guide: https://infomaker.github.io/NPWriterDevelopers/getting-started/
# Install NodeJS 6.9.1 or later
## For Windows: Install Visual Studio 2013 Express first
## npm install
## npm run build-dep
## npm run dev
# run `CONFIG_FILE=writer-fd-dev.json npm run dev` in `NPWriter/`
## For Windows use `set CONFIG_FILE=writer-fd-dev.json&npm run dev` instead
# Navigate to `webwriter-plugins` and run `npm install`
# Then run `npm run dev` in `webwriter-plugins` to run the `NPWriterDevKit`
# Open `localhost:5000` in a browser

In other sessions you only need to:
# start Webwriter by calling `CONFIG_FILE=writer-fd-dev.json npm run dev` in `NPWriter/`
# and run `npm run dev` to start the `NPWriterDevKit`/`webwriter-plugins` for plugin development and enable change watch