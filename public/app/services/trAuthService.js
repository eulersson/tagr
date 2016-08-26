(function() {
"use strict";

angular.module('app')
  .factory('trAuthService', function($http, $q, trIdentityService) {
    return {
      authenticateUser: function(username, password) {
        var qu = $q.defer();
        console.log("EI! " + username + ':' + password);
        $http
          .post('/login', {username: username, password: password})
          .then(function(response) {
            console.dir(response);
            if (response.data.success) {
              trIdentityService.currentUser = response.data.user;
              qu.resolve(true);
            } else {
              qu.resolve(false);
            }
          });
        return qu.promise;
      }
    }
  })


})();