(function() {
"use strict";

angular.module('app')
  .controller('trTagsCtrl', function($http, $location, $mdColors, $scope) {
    $scope.showMiddle = true;

    // Scoped variables
    $scope.products = [];
    $scope.footerCollapsed = false;
    $scope.priceRegex = "^\\d+[,\\.]\\d+$";

    // Removes a product from the item list
    $scope.removeProduct = function(product) {
      console.log("removing " + product.name);
      var index = $scope.products.indexOf(product);
      $scope.products.splice(index, 1);
    }


    // When blur event happens on the brand field
    $scope.getLogoOnBrandBlur = function(ev, product) {
      console.log("getLogoOnBrandBlur called");
      var sanitizedName = product.brand.split(' ').join('').toLowerCase();
      var logoUrl = 'https://logo.clearbit.com/' + sanitizedName + '.com?size=50&greyscale=true';
      $http({ method: 'GET', url: logoUrl })
        .then(
          function success(res) { product.logo = logoUrl },
          function error(res) { product.logo = ''}
        );
    
    }

    // Gets the background image given a logo url
    $scope.getAvatarImg = function(logoUrl) {
      console.log("getAvatarImg called");
      if (logoUrl) {
        return { 'background-image': "url('" + logoUrl + "')", 'opacity': '1.0' }
      } else {
        return { 'background-image': "none",  'opacity': '0.0' }
      }
    }

    // Shows help dialog
    $scope.showHelpDialog = function(ev) {
      console.log("Show help dialog clicked");
    }

    // Redirects user to print page passing the products scoped variable
    $scope.generatePrint = function() {
      console.log("Generate print clicked")
    }

    // Appends product to list of modifiable stock
    $scope.addProduct = function() {
      $scope.products.push({name: "", brand: "", before: "", after: "", logo: ""});
    }

    // Displays or hides the little arrow that expands the footer menu
    $scope.isFooterAvailable = function() {
      if ($scope.products.length) { return true; } else { return false; }
    }

    // If there are entries on the list the header should be collapsed
    $scope.getHeaderClass = function() {
      if ($scope.products.length) { return 'small'; } else { return 'full'; }
    }

    // As mdColors is needed insteaf of ng-style we wrap it into a function
    $scope.getHeaderStyle = function() {
      var overlayColor = $mdColors.getThemeColor('blue-grey-900-0.8');
      var background = 'linear-gradient(' + overlayColor + ',' + overlayColor +
        '), url(\'../../img/east.jpg\') center';
      return {
        background: background,
      }
    }

    // Gets footer style with correct colors through mdColors
    $scope.getFooterStyle = function() {
      var overlayColor = $mdColors.getThemeColor('blue-grey-900-0.8');
      var background = 'linear-gradient(' + overlayColor + ',' + overlayColor +
        '), url(\'../../img/east.jpg\') bottom';
      return {
        background: background,
      }
    }
  });

})();

angular.module('app')
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