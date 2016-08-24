(function() {
"use strict";

angular.module('app')
  .factory('trAuth', function($http, $q, trIdentity) {
    return {
      authenticateUser: function(username, password) {
        var qu = $q.defer();
        console.log("EI! " + username + ':' + password);
        $http
          .post('/login', {username: username, password: password})
          .then(function(response) {
            console.dir(response);
            if (response.data.success) {
              trIdentity.currentUser = response.data.user;
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