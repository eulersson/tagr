(function() {
"use strict";

angular.module('app').controller('trPortalCtrl', function() {
  var vm = this;
  vm.current = 'login';

  vm.swap = function(current) {
    if (current === 'login') { vm.current = 'signup'; }
    else if (current === 'signup') { vm.current = 'login'}
  }
});

angular.module('app').controller('trLoginCtrl', function($location, $mdToast, trAuthService, trIdentityService) {
  var vm = this;
  vm.email = "blanquer.ramon@gmail.com";
  vm.password = '';

  vm.login = function(username, password) {
    trAuthService.authenticateUser(username, password).then(function(success) {
      if (success) {
        $location.path('/');
      } else {
        $mdToast.show(
          $mdToast.simple()
            .textContent("Incorrect credentials.")
            .position("top right")
        );
      }
    })
  }
});

angular.module('app').controller('trSignUpCtrl', function() {
  var vm = this;

  vm.name = 'Neus';
  vm.email = 'blanquer.neus@gmail.com';
  vm.password = '';
  vm.code = 'RVX2017';

  vm.signup = function(name, email, password, code) {
    console.log("Signing up " + name + " " + email + " " + password + " " + code);
  }
})

})();