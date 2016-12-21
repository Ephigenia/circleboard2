A tabular display of the most recent builds on circleci for use in a dashboard display.

![Screenshot of Circleboard in Action from 2016-12-21](https://raw.githubusercontent.com/Ephigenia/circleboard2/master/screenshot.jpg)

## Requirements

- [nodejs](https://nodejs.org/en/) version is documented in [.nvmrc](.nvmrc)
 If you don’t have that version installed, use [nvm](https://github.com/creationix/nvm)

## Setup

Before you can start testing or developing you’ll have to install all dependencies with:

    npm install
    npm start

## Releasing

Releasing a new version can be done using the "version" command from npm. This command is configured in the `package.json` to run all tests, create the changelog, bump the version and then push all those updates as a new tag to the remote.

    npm version

Make sure you’re using properly formatted commit messages like specified in the [angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md) so that the changelog can be generated properly.
