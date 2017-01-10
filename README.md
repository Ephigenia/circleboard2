[![MIT License](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![CircleCI](https://circleci.com/gh/Ephigenia/circleboard2.svg?style=svg)](https://circleci.com/gh/Ephigenia/circleboard2)
[![Code Climate](https://codeclimate.com/repos/586cd56729b35a26b6002382/badges/994061a9c966d2e9b3fe/gpa.svg)](https://codeclimate.com/repos/586cd56729b35a26b6002382/feed)
[![package.json dependencies](https://www.versioneye.com/user/projects/586e22033ab148003228acf4/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/586e22033ab148003228acf4)
[![bower.json dependencies](https://www.versioneye.com/user/projects/586e22052f149b00509e7278/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/586e22052f149b00509e7278)

A tabular display of the most recent builds on circleci for use as a build monitor dashboard display. Checkout the Demo on https://circleboard2.herokuapp.com/

![Screenshot of Circleboard in Action from 2016-12-21](https://raw.githubusercontent.com/Ephigenia/circleboard2/master/screenshot.jpg)

## Requirements

- [nodejs](https://nodejs.org/en/) version is documented in [.nvmrc](.nvmrc)
 If you don’t have that version installed, use [nvm](https://github.com/creationix/nvm)

## Demo/Your Board

There’s a alway up to date version running at https://circleboard2.herokuapp.com/ where you can set you own [CircleCi API Token](https://circleci.com/account/api) and use it as your dashboard.

## Deployment

If you’re planning to run you own instance on heroku:
[![Deploy CircleBoard on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Running

You can run your own instance after `npm install` with:

    npm start

## Develop

Before you can start testing or developing you’ll have to install all dependencies with:

    npm install
    npm start

## Tests

There are not tests so far. Will be added in later version.

## Releasing

Releasing a new version can be done using the "version" command from npm. This command is configured in the `package.json` to run all tests, create the changelog, bump the version and then push all those updates as a new tag to the remote.

    npm version

Make sure you’re using properly formatted commit messages like specified in the [angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md) so that the changelog can be generated properly.
