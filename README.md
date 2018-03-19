Simple angular driven application which shows [circleci](https://circleci.com) build jobs and workflows in a auto-refreshing, configurable dashboard.

[![MIT License](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![CircleCI](https://circleci.com/gh/Ephigenia/circleboard2.svg?style=svg)](https://circleci.com/gh/Ephigenia/circleboard2)
[![Known Vulnerabilities](https://snyk.io/test/github/ephigenia/circleboard2/badge.svg)](https://snyk.io/test/github/ephigenia/circleboard2)
[![Maintainability](https://api.codeclimate.com/v1/badges/9758387a89d50689876d/maintainability)](https://codeclimate.com/github/Ephigenia/circleboard2/maintainability)


# Features

![Screenshot of Circleboard in Action from 2018-01-18](https://raw.githubusercontent.com/Ephigenia/circleboard2/master/screenshot.png)

- refreshing list of all build jobs in order of creation
- optional grouping of jobs from the same workflow
- circleci token stored in localstorage, can also be injected via GET-parameter (`?apiToken=<value>`)
- inject other config settings via GET parameters (f.e. `?refreshInterval=20&groupWorkflows=true&fontSize=20`)
- message when device/client goes offline

Other ideas & planned features can be found in the [wiki](https://github.com/Ephigenia/circleboard2/wiki). If something doesn’t work please [create an issue](https://github.com/ephigenia/circleboard2/issues).


# Demo

The latest version of this is running on https://circleboard2.herokuapp.com/ where you can set you own [CircleCi API Token](https://circleci.com/account/api) using the gear icon in the main navigation bar and use it as your dashboard.


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


## Dashboard Display

Using a [Raspberry Pi3](https://www.raspberrypi.org) as permanent dashboard display is very easy. Setup the raspberrypi with standard noobs and use the pre-installed chrome to startup automatically and open the circleboard.

Example X config file:

```
# /home/pi/.config/lxsession/LXDE-pi/autostart

# deactivated default lines
#@lxpanel --profile LXDE-pi
#@pcmanfm --desktop --profile LXDE-pi
#@xscreensaver -no-splash
#@point-rpi

# now the new lines:
# disable sleep mode
@xset s off
@xset -dpms
@xset s noblank

# hide cursor
# requires "unclutter" to be installed
#   sudo apt-get install unclutter
@unclutter -idle 0

# read about supported comamnd line arguemnts:
# https://peter.sh/experiments/chromium-command-line-switches/
@chromium-browser --noerrdialogs --incognito --disable-infobars --kiosk http://circleboard2.herokuapp.com/?apiToken=<your-api-token>&groupWorkflows=true&refreshInterval=15&fontSize=18
```
