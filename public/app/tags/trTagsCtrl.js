(function() {
"use strict";

angular.module('app')
  .controller('trTagsCtrl', function($cookies, $http, $location, $mdColors, $mdDialog, trProductsService, trAuthService) {
    var vm = this;

    vm.logout = function() {
      trAuthService.logoutUser();
      $location.path('/portal');
    }

    // Controller attributes
    vm.footerCollapsed = false;
    vm.priceRegex = "^\\d+[,\\.]\\d+$";
    vm.products = trProductsService.products;
    vm.showMiddle = true;
    vm.selectedFont = 'Lobster';
    vm.fonts = ['Lobster', 'Dosis'];
    vm.setDefaultLogo = false;
    vm.defaultLogoUrl = 'http://i.imgur.com/EOyYrK6.jpg';

    var focusedBrand, focusedDefaultLogoUrl;

    // Appends product to list of modifiable stock
    vm.addProduct = function() {
      trProductsService.addProduct();
    }

    // Gets the background image given a logo url
    vm.getAvatarImg = function(logoUrl) {
      if (logoUrl) {
        return { 'background-image': "url('" + logoUrl + "')", 'opacity': '1.0' }
      } else {
        return { 'background-image': "none",  'opacity': '0.0' }
      }
    }

    // Gets footer style with correct colors through mdColors
    vm.getFooterStyle = function() {
      var overlayColor = $mdColors.getThemeColor('blue-grey-900-0.8');
      var background = 'linear-gradient(' + overlayColor + ',' + overlayColor +
        '), url(\'../../img/east.jpg\') bottom';
      return {
        background: background,
      }
    }

    // If there are entries on the list the header should be collapsed
    vm.getHeaderClass = function() {
      if (vm.products.length) { return 'small'; } else { return 'full'; }
    }

    // As mdColors is needed insteaf of ng-style we wrap it into a function
    vm.getHeaderStyle = function() {
      var overlayColor = $mdColors.getThemeColor('blue-grey-900-0.8');
      var background = 'linear-gradient(' + overlayColor + ',' + overlayColor +
        '), url(\'../../img/east.jpg\') center';
      return {
        background: background,
      }
    }

    // Redirects user to print page passing the products scoped variable
    vm.generatePrint = function() {
      console.log("Generate print clicked");
      trProductsService.saveProductsAsCookie();
      $location.path('/print');
      
    }

    // Displays or hides the little arrow that expands the footer menu
    vm.isFooterAvailable = function() {
      if (vm.products.length) { return true; } else { return false; }
    }

    // Stores value of product brand. It will be compared later on
    vm.onBrandFocus = function(product) {
      focusedBrand = product.brand;
    }

    // On blurring it will send a request to logo service just in case there is need 
    vm.onBrandBlur = function(product) {
      if (product.brand) {
        if (product.brand !== focusedBrand) {
          var sanitizedName = product.brand.split(' ').join('').toLowerCase();
          trProductsService.getLogo(sanitizedName)
            .then(function(retrievedLogo) {
              product.logo = retrievedLogo
            });
        } // product.brand !== focusedBrand
      } else { // product.brand
        product.logo = trProductsService.defaultLogo;
      }
    }

    // On blurring check if the image is loadable if it is not, bring back the previous
    vm.onDefaultLogoBlur = function() {
      $http({
        method: 'GET',
        url: vm.defaultLogoUrl
      })
        .then(function success(res) {
          console.log("All good");
          console.dir(res);
          vm.defaultLogoUrl = vm.defaultLogoUrl; 
        }, function error(res) {
          console.log("oh shit");
          console.log(focusedDefaultLogoUrl);
          vm.defaultLogoUrl = focusedDefaultLogoUrl;
        })
    }

    // Store the current value for the default logo
    vm.onDefaultLogoFocus = function() {
      focusedDefaultLogoUrl = vm.defaultLogoUrl;
    }

    // Removes a product from the item list
    vm.removeProduct = function(product) {
      trProductsService.removeProduct(product);
    }

    // Shows help dialog
    vm.showHelpDialog = function(ev) {
      $mdDialog.show({
        controller: 'trHelpCtrl',
        controllerAs: 'help',
        templateUrl: 'partials/help/help',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false
      });
    }

  });

})();