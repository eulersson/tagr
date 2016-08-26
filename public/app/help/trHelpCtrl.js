(function() {
"use strict";

angular.module('app')
  .controller('trHelpCtrl', function($mdDialog) {
    this.message = "This is Help Controller!";
    this.close = function() {
      $mdDialog.cancel();

    }
});

})();