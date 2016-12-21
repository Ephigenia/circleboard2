(function() {
  'use strict';

  angular
  .module('circleboard')
  .component('navbarComponent', {
    templateUrl: 'scripts/NavBar.html',
    controller: function(
      $log,
      $document,
      Config
    ) {
      var FONT_SIZE_MAX = 32;
      var FONT_SIZE_MIN = 8;

      this.setFontSize = function(sizePixel) {
        // cap the font size between min and max
        if (sizePixel > FONT_SIZE_MAX) {
          sizePixel = FONT_SIZE_MAX;
        } else if (sizePixel < FONT_SIZE_MIN) {
          sizePixel = FONT_SIZE_MIN;
        }
        $log.debug('setFontSize', sizePixel);
        // adjust the displayed font size by adding a font Size to the body
        // element
        $document[0].body.style.fontSize = sizePixel + 'px';
        // store the font size in the config
        Config.fontSize = sizePixel;
        Config.save();
        return this;
      };

      this.increaseFontSize = function() {
        return this.setFontSize(Config.fontSize + 1);
      };
      this.decreaseFontSize = function() {
        return this.setFontSize(Config.fontSize - 1);
      };

      // set default font size
      if (!Config.fontSize) {
        Config.fontSize = 16;
      }
      this.setFontSize(Config.fontSize);
    }
  });
})();
