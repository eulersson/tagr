(function() {
"use strict";

angular.module('app')
  .controller('trPrintCtrl', function($scope) {
    $scope.showMiddle = true;
    $scope.message = "This is Print Controller!";
});

})();