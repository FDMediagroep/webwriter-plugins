# I want to contribute!
If you want to contribute that's great! Here are a few tips to get you started.

## Getting started
Follow the getting started guide in README.md to get Webwriter up-and-running
locally.

## 2 spaces
The Webwriter build has a strict 2-spaces indentation rule. Compilation will
fail when this rule is broken. So set your IDE indentation for this project
accordingly.

## Feature branches
Use feature branches when working on a new feature. It makes sense but it's
crucial to make the development -> deployment flow go smooth.
Whenever you're done with a feature you can merge your feature branch into 
`master`. This will automatically trigger a build and deployment to the
`development environment`.

Merging this branch into the `acceptance` branch will do the same for the
`acceptance environment`. And the same applies for the `production` branch.
Merging branches in this manner allows control on what features to release.
It is already possible to deploy `any` branch to the `development environment`.
This allows for feature testing.

Normally the goal is to keep `acceptance` and `production` the same as `master` 
when releasing. But there will be times when for instance a hotfix is needed.
In such case you could create the fix in a feature branch which is branched of 
from `acceptance` and deploy that to `development environment` for testing. 
Then merge it back to `acceptance` for a final test before merging it to 
`production`. This proces allows development to keep on going while a hotfix 
gets put on the fast track. It also allows you to securely and separately 
deploy the fix without fear of pushing other unwanted commits.

## Resources
* https://infomaker.github.io/NPWriterDevelopers/getting-started/
* https://github.com/Infomaker
* https://infomaker.github.io/NPWriterDevelopers/api-reference/
* http://substance.io/docs/beta5/util/Configurator.html
