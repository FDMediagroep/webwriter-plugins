[![build status](https://gitlab.fdmg.org/devops/webwriter-plugins/badges/develop/build.svg)](https://gitlab.fdmg.org/devops/webwriter-plugins/commits/develop)
[![coverage report](https://gitlab.fdmg.org/devops/webwriter-plugins/badges/develop/coverage.svg)](https://gitlab.fdmg.org/devops/webwriter-plugins/commits/develop)

# Release webwriter plugins
## Make sure:

1. You are in contact with someone from `InfoMaker` before you release plugins to acceptance or production. This is very important.
1. You are `up-to-date` with the `webwriter-plugins branches/repo`. If you are releasing to production, make sure the acceptance environment is working properly.
1. You have the `fdmg-services-config` repo available and up-to-date (master branch).

## Release to production
1. In the `fdmg-services-config` project make sure that all `Infomaker plugin base urls` are up to date in the `webwriter-prod-<publication>.properties`. - These are Infomaker plugins such as heading, preamble etc.
 1. Production should get the same version number as Acceptance e.g. `infoMaker.plugins.base=https://plugins.writer.infomaker.io/prod/3.2.2`. (Acceptance and Production both use Infomaker production ready plugins.)
1. Checkout the `webwriter-plugins` acceptance branch and make sure you are up-to-date.
1. Inform Infomaker you are about to release the new plugins. They should update the writer backend on their side `before` we release our plugins. 
1. Once IM is done releasing a new writer to production, checkout the `webwriter-plugins` production branch, and merge acceptance in production, push after this.
1. Go to `https://gitlab.fdmg.org/devops/webwriter-plugins/pipelines` and wait for the build to succed. After this you have to (manually) deploy the plugins.
 1. (you can deploy by left-clicking the circles in the 'stages column')
1. Verify if the deploy succeeded and the production webwriter works with the new plugins.

## Release to acceptance
1. (It is less necassery to have Infomaker present when releasing to acceptance. However, the steps are almost identical.)
1. In the `fdmg-services-config` project make sure that all `Infomaker plugin base urls` are up to date in the `webwriter-prod-<publication>.properties`. - These are Infomaker plugins such as heading, preamble etc.
 1. Ask infomaker what (new) version number you need for the `Infomaker plugin base urls` on the acceptance branch e.g. `infoMaker.plugins.base=https://plugins.writer.infomaker.io/prod/3.2.2`.
1. Checkout the `webwriter-plugins` develop branch and make sure you are up-to-date.
1. Inform Infomaker you are about to release the new plugins. They should update the writer backend on their side `before` we release our plugins. 
1. Once IM is done releasing a new writer to acceptance, checkout the `webwriter-plugins` acceptance branch, and merge develop in acceptance, push after this.
1. Go to `https://gitlab.fdmg.org/devops/webwriter-plugins/pipelines` and wait for the build to succed. After this you have to (manually) deploy the plugins.
 1. (you can deploy by left-clicking the circles in the 'stages column')
1. Verify if the deploy succeeded and the acceptance webwriter works with the new plugins.