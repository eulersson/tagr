(function() {
"use strict";

angular.module('app')
  .controller('trTagsCtrl', function($cookies, $http, $location, $mdColors, $mdDialog, trProductsService, trAuthService) {

    this.logout = function() {
      trAuthService.logoutUser();
      $location.path('/portal');
    }

    // Controller attributes
    this.footerCollapsed = false;
    this.priceRegex = "^\\d+[,\\.]\\d+$";
    this.products = trProductsService.products;
    this.showMiddle = true;
    this.selectedFont = 'Lobster';
    this.fonts = ['Lobster', 'Dosis'];
    this.setDefaultLogo = false;

    var focusedBrand;

    // Appends product to list of modifiable stock
    this.addProduct = function() {
      trProductsService.addProduct();
    }

    // Gets the background image given a logo url
    this.getAvatarImg = function(logoUrl) {
      if (logoUrl) {
        return { 'background-image': "url('" + logoUrl + "')", 'opacity': '1.0' }
      } else {
        return { 'background-image': "none",  'opacity': '0.0' }
      }
    }

    // Gets footer style with correct colors through mdColors
    this.getFooterStyle = function() {
      var overlayColor = $mdColors.getThemeColor('blue-grey-900-0.8');
      var background = 'linear-gradient(' + overlayColor + ',' + overlayColor +
        '), url(\'../../img/east.jpg\') bottom';
      return {
        background: background,
      }
    }

    // If there are entries on the list the header should be collapsed
    this.getHeaderClass = function() {
      if (this.products.length) { return 'small'; } else { return 'full'; }
    }

    // As mdColors is needed insteaf of ng-style we wrap it into a function
    this.getHeaderStyle = function() {
      var overlayColor = $mdColors.getThemeColor('blue-grey-900-0.8');
      var background = 'linear-gradient(' + overlayColor + ',' + overlayColor +
        '), url(\'../../img/east.jpg\') center';
      return {
        background: background,
      }
    }

    // Redirects user to print page passing the products scoped variable
    this.generatePrint = function() {
      console.log("Generate print clicked");
      trProductsService.saveProductsAsCookie();
      $location.path('/print');
      
    }

    // Displays or hides the little arrow that expands the footer menu
    this.isFooterAvailable = function() {
      if (this.products.length) { return true; } else { return false; }
    }

    // Stores value of product brand. It will be compared later on
    this.onBrandFocus = function(product) {
      focusedBrand = product.brand;
    }

    // On blurring it will send a request to logo service just in case there is need 
    this.onBrandBlur = function(product) {
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

    // Removes a product from the item list
    this.removeProduct = function(product) {
      trProductsService.removeProduct(product);
    }

    // Shows help dialog
    this.showHelpDialog = function(ev) {
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