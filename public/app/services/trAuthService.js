(function() {
"use strict";

angular.module('app')
  .factory('trAuthService', function($http, $q, trIdentityService) {
    return {
      authenticateUser: function(username, password) {
        var qu = $q.defer();
        $http
          .post('/login', {username: username, password: password})
          .then(function(response) {
            // console.dir(response);
            if (response.data.success) {
              trIdentityService.currentUser = response.data.user;
              qu.resolve(true);
            } else {
              qu.resolve(false);
            }
          });
        return qu.promise;
      },
      logoutUser: function() {
        var dfd = $q.defer();
        $http.post('/logout', {logout: true}).then(function() {
          trIdentityService.currentUser = undefined;
          dfd.resolve();
        });
        return dfd.promise;
      },
      authorizeCurrentUserForRoute: function() {
        if (trIdentityService.isAuthenticated()) {
          return true;
        } else {
          return $q.reject('not authorized');
        }
      }
    }
  })


})();