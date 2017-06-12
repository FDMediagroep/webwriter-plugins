[![build status](https://gitlab.fdmg.org/devops/webwriter-plugins/badges/develop/build.svg)](https://gitlab.fdmg.org/devops/webwriter-plugins/commits/develop)
[![coverage report](https://gitlab.fdmg.org/devops/webwriter-plugins/badges/develop/coverage.svg)](https://gitlab.fdmg.org/devops/webwriter-plugins/commits/develop)

# Release webwriter plugins

#TL;DR

1. Ask Infomaker to release latest (acc/prod) writer to desired environment. (this is mandatory, you don't want new features that work on dev, to break on acc/prod because of an outdated writer!).
2. Make sure the services have been released and `fdmg-services-config` is up-to-date for the environment you want to push to and perform `step 1.1 for production` or `2.1 for acceptance` (below).
3. Merge and push the branch; merge acceptance into production and push. (same goes for dev into acceptance obviously)
4. Go to gitlab `https://gitlab.fdmg.org/devops/webwriter-plugins/pipelines` and deploy your latest commit (merge) to all environments.
5. You are done.

## Make sure:

1. You are in contact with someone from `InfoMaker` before you release plugins to acceptance or production. This is very important.
1. You are `up-to-date` with the `webwriter-plugins branches/repo`. If you are releasing to production, make sure the acceptance environment is working properly.
1. You have the `fdmg-services-config` repo available and up-to-date (master branch).

## Release to production
1. In the `fdmg-services-config` project make sure that all `Infomaker plugin base urls` are up to date in the `webwriter-prod-<publication>.properties`. - These are Infomaker plugins such as heading, preamble etc.
 1. Production should get the same version number as Acceptance e.g. `infoMaker.plugins.base=https://plugins.writer.infomaker.io/prod/3.2.2`. (Acceptance and Production both use Infomaker production ready plugins.)
2. Checkout the `webwriter-plugins` acceptance branch and make sure you are up-to-date.
3. Inform Infomaker you are about to release the new plugins. They should update the writer backend on their side `before` we release our plugins (all publications since it's a shared codebase).
4. Once IM is done releasing a new writer to production, checkout the `webwriter-plugins` production branch, and merge acceptance in production, push after this.
5. Go to `https://gitlab.fdmg.org/devops/webwriter-plugins/pipelines` and wait for the build to succed. After this you have to (manually) deploy the plugins.
 1. (you can/must deploy per publication by left-clicking the circles in the 'stages column' and click the appropriate deploy)
6. Verify if the deploy succeeded and the production webwriter works with the new plugins.

## Release to acceptance
1. (It is less necassery to have Infomaker present when releasing to acceptance. However, the steps are almost identical.)
2. In the `fdmg-services-config` project make sure that all `Infomaker plugin base urls` are up to date in the `webwriter-prod-<publication>.properties`. - These are Infomaker plugins such as heading, preamble etc.
 1. Ask infomaker what (new) version number you need for the `Infomaker plugin base urls` on the acceptance branch e.g. `infoMaker.plugins.base=https://plugins.writer.infomaker.io/prod/3.2.2`.
3. Checkout the `webwriter-plugins` develop branch and make sure you are up-to-date.
4. Inform Infomaker you are about to release the new plugins. They should update the writer backend on their side `before` we release our plugins. 
5. Once IM is done releasing a new writer to acceptance, checkout the `webwriter-plugins` acceptance branch, and merge develop in acceptance, push after this.
6. Go to `https://gitlab.fdmg.org/devops/webwriter-plugins/pipelines` and wait for the build to succed. After this you have to (manually) deploy the plugins.
 1. (you can/must deploy per publication by left-clicking the circles in the 'stages column' and click the appropriate deploy)
7. Verify if the deploy succeeded and the acceptance webwriter works with the new plugins.