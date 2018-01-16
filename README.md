*Rewrite in newest angular version, alpha and continuously updated.*

**Do not use in production**

[![MIT License](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![CircleCI](https://circleci.com/gh/Ephigenia/circleboard2.svg?style=svg)](https://circleci.com/gh/Ephigenia/circleboard2)
[![Known Vulnerabilities](https://snyk.io/test/github/ephigenia/circleboard2/badge.svg)](https://snyk.io/test/github/ephigenia/circleboard2)

# Features

- refreshing list of all build jobs in order of creation
- optional grouping of jobs from the same workflow
- circleci token stored in localstorage, can also be injected via GET-parameter (`?apiToken=<value>`)

# Demo

The latest version of this is running on https://circleboard2-next.herokuapp.com/ where you can set you own [CircleCi API Token](https://circleci.com/account/api) using the gear icon in the main navigation bar and use it as your dashboard.

# Deployment

If you’re planning to run you own instance on heroku:
[![Deploy CircleBoard on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Requirements

- [nodejs](https://nodejs.org/en/) version is documented in [.nvmrc](.nvmrc)
  If you don’t have that version installed, use [nvm](https://github.com/creationix/nvm)

# Development

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Dist

Run `npm run build` to build the project. The build artifacts (static version of the applicatoin) will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

# Tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `npm run tdd` to execute the unit tests while watching for changes and run them again.

## Releasing

Releasing a new version can be done using the "version" command from npm. This command is configured in the `package.json` to run all tests, create the changelog, bump the version and then push all those updates as a new tag to the remote.

    npm version

Make sure you’re using properly formatted commit messages like specified in the [angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md) so that the changelog can be generated properly.

# Plan

- [ ] add screenshot to readme
- [ ] setup commitlint
- [ ] config page with hint for apiToken as GET parameter
- [ ] review circleCi configuration
- [ ] add CONTRIBUTION files
- [ ] add PR Request Template
- [ ] add Issue Request Template
- [ ] customizable columns
- [x] optional grouping of workflows
- [ ] list of repo/branchnames in config which are listed as bootstrap-cards to monitor specific repo’s states
- [ ] dark mode
- [ ] dark mode switch in config
- [ ] auto-dark mode when sun is down in timezone
- [ ] footer with version
- [ ] footer with github link
- [ ] switch from `ng serve` to dist http-server
