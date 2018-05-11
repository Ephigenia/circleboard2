<a name="3.0.0-alpha.2"></a>
# [3.0.0-alpha.2](https://github.com/ephigenia/circleboard2/compare/v3.0.0-alpha.1...v3.0.0-alpha.2) (2018-05-11)


### Bug Fixes

* link to config when api key is not set ([e1524b4](https://github.com/ephigenia/circleboard2/commit/e1524b4))
* makes routerlink to config absolute ([9e9ae9e](https://github.com/ephigenia/circleboard2/commit/9e9ae9e))
* makes routerLink to config absolute ([77fd176](https://github.com/ephigenia/circleboard2/commit/77fd176))
* updates rxjs imports & operators usage ([d346784](https://github.com/ephigenia/circleboard2/commit/d346784))
* workflow build labels use job id in title ([9e67bae](https://github.com/ephigenia/circleboard2/commit/9e67bae))


### Features

* adds app-init loading modal ([8d84f73](https://github.com/ephigenia/circleboard2/commit/8d84f73))
* adds noscript infotext in the index.html ([e32f780](https://github.com/ephigenia/circleboard2/commit/e32f780))



<a name="3.0.0-alpha.1"></a>
# [3.0.0-alpha.1](https://github.com/ephigenia/circleboard2/compare/v2.5.1...v3.0.0-alpha.1) (2018-01-24)


### Bug Fixes

* apiKey -> apiToken ([7e9ea9c](https://github.com/ephigenia/circleboard2/commit/7e9ea9c))
* **build-list:** no padding under job-list ([985d0e9](https://github.com/ephigenia/circleboard2/commit/985d0e9))
* **build-list:** removes error message on subsequent requests ([b59007b](https://github.com/ephigenia/circleboard2/commit/b59007b))
* **build-list:** show api error hint only on 400-500 error status codes ([f50d975](https://github.com/ephigenia/circleboard2/commit/f50d975))
* **recent-builds:** changes empty message ([e7b5e84](https://github.com/ephigenia/circleboard2/commit/e7b5e84))
* **recent-builds:** continue after http failure ([f74267b](https://github.com/ephigenia/circleboard2/commit/f74267b))
* **recent-builds:** improves error message display ([a2ba600](https://github.com/ephigenia/circleboard2/commit/a2ba600))
* **recent-builds:** only show empty message when no error happened ([1e2e05b](https://github.com/ephigenia/circleboard2/commit/1e2e05b))


### Features

* inject fontSize, groupWorkflows, refreshInterval via GET param ([d946cd9](https://github.com/ephigenia/circleboard2/commit/d946cd9))
* workflow grouping, README update for dev version ([5f34e7f](https://github.com/ephigenia/circleboard2/commit/5f34e7f))
* **build-list:** message when client goes offline ([b523d35](https://github.com/ephigenia/circleboard2/commit/b523d35))
* **config:** optional grouping of workflows ([8c33d55](https://github.com/ephigenia/circleboard2/commit/8c33d55))



<a name="2.5.1"></a>
## [2.5.1](https://github.com/ephigenia/circleboard2/compare/v2.5.0...v2.5.1) (2017-07-18)


### Bug Fixes

* updates node version ([36c2bf2](https://github.com/ephigenia/circleboard2/commit/36c2bf2))
* updates packages to their latest ([9b65623](https://github.com/ephigenia/circleboard2/commit/9b65623))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/ephigenia/circleboard2/compare/v2.4.0...v2.5.0) (2017-01-25)


### Bug Fixes

* **build-list:** labels are badges as of bootstrap alpha-6 ([0295095](https://github.com/ephigenia/circleboard2/commit/0295095))
* **navbar:** bootstrap 4 alpha 6 adjustments ([8ecb7f9](https://github.com/ephigenia/circleboard2/commit/8ecb7f9))


### Features

* not started build show their author date ([8115146](https://github.com/ephigenia/circleboard2/commit/8115146))
* **build-list:** title tooltips for the build start/end, author dates ([b12091c](https://github.com/ephigenia/circleboard2/commit/b12091c))
* **build-list:** uppercase outcome & lifecycle labels ([51c51b5](https://github.com/ephigenia/circleboard2/commit/51c51b5))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/ephigenia/circleboard2/compare/v2.3.1...v2.4.0) (2017-01-05)



<a name="2.3.1"></a>
## [2.3.1](https://github.com/ephigenia/circleboard2/compare/v2.3.0...v2.3.1) (2017-01-04)


### Bug Fixes

* **build-list:** error display ([1da135c](https://github.com/ephigenia/circleboard2/commit/1da135c))
* lowercase filename for BuildService ([60c3c96](https://github.com/ephigenia/circleboard2/commit/60c3c96))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/ephigenia/circleboard2/compare/v2.2.0...v2.3.0) (2017-01-04)


### Bug Fixes

* **build-list:** hover space underline in paperclip icon ([0f60877](https://github.com/ephigenia/circleboard2/commit/0f60877))
* **build-list:** refresh interval does work as expected now ([07a0e1e](https://github.com/ephigenia/circleboard2/commit/07a0e1e))


### Features

* **build-list:** show list is empty message when no builds there ([b0f417e](https://github.com/ephigenia/circleboard2/commit/b0f417e))
* **config:** disable save btn when invalid values ([be223f1](https://github.com/ephigenia/circleboard2/commit/be223f1))
* **config:** pristine state and save btn disabled when pristine ([b1ef3b0](https://github.com/ephigenia/circleboard2/commit/b1ef3b0))
* **config:** validation state for api token and refresh interval ([1762440](https://github.com/ephigenia/circleboard2/commit/1762440))
* **nav-bar:** show countdown & loading indicator ([e79a565](https://github.com/ephigenia/circleboard2/commit/e79a565))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/ephigenia/circleboard2/compare/v2.1.0...v2.2.0) (2016-12-22)


### Bug Fixes

* **nav:** btn float right on small screens ([c6c43a4](https://github.com/ephigenia/circleboard2/commit/c6c43a4))


### Features

* add calendar-ok and calender-not-ok icons to build item ([a8cbe8c](https://github.com/ephigenia/circleboard2/commit/a8cbe8c))
* apiToken can be set with /#?apiToken=<value> ([6f917ee](https://github.com/ephigenia/circleboard2/commit/6f917ee))
* circleci api errors shown ([7a89e32](https://github.com/ephigenia/circleboard2/commit/7a89e32))
* human readable build duration display ([e78c530](https://github.com/ephigenia/circleboard2/commit/e78c530))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/ephigenia/circleboard2/compare/v2.0.0...v2.1.0) (2016-12-21)


### Bug Fixes

* empty white page when no uri set ([964f559](https://github.com/ephigenia/circleboard2/commit/964f559))


### Features

* add convetional changelog generator, linter and commit hook ([36d07f2](https://github.com/ephigenia/circleboard2/commit/36d07f2))
* add eslint, rules and npm script cmd ([c483058](https://github.com/ephigenia/circleboard2/commit/c483058))
* add favicon ([77b26af](https://github.com/ephigenia/circleboard2/commit/77b26af))
* danger state whole row when failed ([35f670b](https://github.com/ephigenia/circleboard2/commit/35f670b))
* link to build number & project ([7818b56](https://github.com/ephigenia/circleboard2/commit/7818b56))
* show paperclip icon when artifacts ([10c4dfc](https://github.com/ephigenia/circleboard2/commit/10c4dfc))
* update to bootstrap 4 ([15df07a](https://github.com/ephigenia/circleboard2/commit/15df07a))



<a name="2.0.0"></a>
# 2.0.0 (2016-12-20)



