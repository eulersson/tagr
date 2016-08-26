(function() {
"use strict";

angular.module('app').factory('trIdentityService', function() {
  return {
    currentUser: undefined,
    isAuthenticated: function() {
      console.log(!!this.currentUser);
      return !!this.currentUser;
    }
  }
});


})();