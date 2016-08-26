(function() {
"use strict";

app.module('app')
  .factory('trProductsService', function($http) {
    var factory = {
      getLogo: getLogo
    }

    function getLogo(logoUrl) {
      var defer = $q.defer();
    }

  })
})();