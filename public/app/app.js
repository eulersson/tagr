(function() {
"use strict";

angular.module('app', ['ngAnimate', 'ngCookies', 'ngMaterial', 'ngMessages', 'ngRoute'])
  // Module configuration
  .config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    var routeChecks = {
      auth: function(trAuthService) {
        return trAuthService.authorizeCurrentUserForRoute();
      }
    }

    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/partials/tags/tags',
        controller: 'trTagsCtrl',
        controllerAs: 'tags',
        resolve: routeChecks
      })
      .when('/dashboard', {
        templateUrl: '/partials/dashboard/dashboard',
        controller: 'trDashboardCtrl',
        controllerAs: 'dashboard',
        resolve: routeChecks
      })
      .when('/print', {
        templateUrl: 'partials/print/print',
        controller: 'trPrintCtrl',
        controllerAs: 'print',
        resolve: routeChecks
      })
      .when('/portal', {
        templateUrl: 'partials/portal/portal',
        controller: 'trPortalCtrl',
        controllerAs: 'portal'
      })
      .otherwise({
        redirectTo: '/'
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
  
  // Root controller for the module
  .controller('trMainCtrl', function($scope, $http, trAuthService, trIdentityService) {
    $scope.identity = trIdentityService;

    $scope.signIn = function(username, password) {
      console.log("Signing in! " + username + ':' + password);
      trAuthService.authenticateUser(username, password)
        .then(function(success) {
          console.dir(success);
          if (success) { console.log("COOL!"); }
          else { console.log("BAD!"); }
        });
    }
  })

  // jQuery animations on classed objects
  .animation('.repeated-item', function() {
    return {
      enter : function(element, done) {
        element.css('opacity',0);
        jQuery(element).animate({
          opacity: 1
        }, done);

        // optional onDone or onCancel callback
        // function to handle any post-animation
        // cleanup operations
        return function(isCancelled) {
          if(isCancelled) {
            jQuery(element).stop();
          }
        }
      },
      leave : function(element, done) {
        element.css('opacity', 1);
        jQuery(element).animate({
          opacity: 0
        }, done);

        // optional onDone or onCancel callback
        // function to handle any post-animation
        // cleanup operations
        return function(isCancelled) {
          if(isCancelled) {
            jQuery(element).stop();
          }
        }
      },
      move : function(element, done) {
        element.css('opacity', 0);
        jQuery(element).animate({
          opacity: 1
        }, done);

        // optional onDone or onCancel callback
        // function to handle any post-animation
        // cleanup operations
        return function(isCancelled) {
          if(isCancelled) {
            jQuery(element).stop();
          }
        }
      },

      // you can also capture these animation events
      addClass : function(element, className, done) {},
      removeClass : function(element, className, done) {}
    }
  })
  
  // Run
  .run(function($location, $rootScope) {
    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/portal');
      }

    })

  });
})();
