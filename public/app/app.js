(function() {
"use strict";

angular.module('app', ['ngAnimate', 'ngMaterial', 'ngMessages', 'ngRoute'])
  .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/partials/tags/tags',
        controller: 'trTagsCtrl'
      })
      .when('/dashboard', {
        templateUrl: '/partials/dashboard/dashboard',
        controller: 'trDashboardCtrl'
      })
      .when('/help', {
        templateUrl: 'partials/help/help',
        controller: 'trHelpCtrl'
      })
      .when('/print', {
        templateUrl: 'partials/print/print',
        controller: 'trPrintCtrl'
      });

    $mdThemingProvider
      .theme('euler')
      .primaryPalette('teal')
      .accentPalette('yellow')
      .warnPalette('red')
      .backgroundPalette('blue-grey')
      .dark();

    $mdThemingProvider.setDefaultTheme('euler');
  })
  .controller('trMainCtrl', function($scope, $http, trAuthService, trIdentityService) {
    $scope.message = "This is Main Controller!";
    $scope.thepass = "lacassa";
    $scope.identity = trIdentityService;

    $scope.signIn = function(username, password) {

      console.log("OI! " + username + ':' + password);
      trAuthService.authenticateUser(username, password)
        .then(function(success) {
          console.dir(success);
          if (success) { console.log("SO COOL!"); }
          else { console.log("BAD!"); }
        });
    }
})
  
})();
