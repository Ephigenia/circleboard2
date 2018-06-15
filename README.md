Simple, responsive [angular6](https://angular.io/) web-application which shows [circleci](https://circleci.com) and [gitlab](https://gitlab.com/) builds, pipelines and workflows in a auto-refreshing, fully configurable dashboard with zero configuration files.

[![MIT License](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![CircleCI](https://circleci.com/gh/Ephigenia/circleboard2.svg?style=svg)](https://circleci.com/gh/Ephigenia/circleboard2)
[![Known Vulnerabilities](https://snyk.io/test/github/ephigenia/circleboard2/badge.svg)](https://snyk.io/test/github/ephigenia/circleboard2)
[![Maintainability](https://api.codeclimate.com/v1/badges/9758387a89d50689876d/maintainability)](https://codeclimate.com/github/Ephigenia/circleboard2/maintainability)


Features
-------------------------------------------------------------------------------
![Screenshot of Circleboard in Action from 2018-01-18](https://raw.githubusercontent.com/Ephigenia/circleboard2/master/screenshot.png)

- show builds from different circleci accounts and gitlab projects
- zero configuration files
- inject configuration via GET parameters or user config page
- optional grouping of builds in pipelines aka workflows
- light and dark mode
- message when device/client goes offline

There are several ideas for upcoming features or allready finished ones in the  [wiki](https://github.com/Ephigenia/circleboard2/wiki). If something doesn’t work please [create an issue](https://github.com/ephigenia/circleboard2/issues).


Demo
-------------------------------------------------------------------------------
The latest version of this is running on https://circleboard2.herokuapp.com/ where you can set you own [CircleCi API Token](https://circleci.com/account/api) using the gear icon in the main navigation bar and use it as your dashboard.


Deployment & Use
-------------------------------------------------------------------------------

## Web-application

The "master" and "development" branch are always automatically deployed to their heroku environments. As the whole application comes with zero configuration you can use these deployments as is and inject your configuration via the GET variables.

- master branch is deployed to https://circleboard2.herokuapp.com/
- development is deployed to https://circleboard2-next.herokuapp.com/

## Heroku

If you’re planning to run you own instance on heroku:
[![Deploy CircleBoard on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Docker

The repo is dockerized and a production ready docker container can be created (requires docker 1.17 or later):

    docker build --no-cache --pull -t circleboard:latest .

Start docker container

    docker run -it --rm --publish 4000:80 circleboard:latest

Then your docker container is available at http://localhost:4000

## Dashboard Display

Using a [Raspberry Pi3](https://www.raspberrypi.org) as permanent dashboard display in your office space is very easy. [Setup the Pi with standard noobs](https://www.raspberrypi.org/documentation/installation/noobs.md) and use the pre-installed chrome show the circleboard on one of the heroku deployments after startup.

Just change the x startup configuration as follows:

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


Development
-------------------------------------------------------------------------------

## Requirements

- [nodejs](https://nodejs.org/en/) version is documented in [.nvmrc](.nvmrc)
If you don’t have that version installed, use [nvm](https://github.com/creationix/nvm)

## Run Dev Server

Run `npm start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


Tests
-------------------------------------------------------------------------------

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm run tdd` to execute the unit tests while watching for changes and run them again.


Dist
-------------------------------------------------------------------------------
Run `npm run build` to build the project. The build artifacts (static version of the applicatoin) will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


Releasing
-------------------------------------------------------------------------------
Releasing a new version can be done using the "version" command from npm. This command is configured in the `package.json` to run all tests, create the changelog, bump the version and then push all those updates as a new tag to the remote.

    npm version

Make sure you’re using properly formatted commit messages like specified in the [angular commit guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md) so that the changelog can be generated properly.
