(function() {
"use strict";

angular.module('app')
  .controller('trPrintCtrl', function($timeout, $window, trProductsService) {
    this.products = trProductsService.products;

    this.splitPrice = function(price) {
      if (price.indexOf('.') !== -1) {
        return price.split('.');
      } else {
        return price.split(',');
      }
    }

    this.printPage = function() {
      $window.print();
    }

    this.getBorderStyle = function($index, $last) {
      var style = {};
      if ($index % 2 || $last) {
        style = {'border-right': '0.5px #CECECE solid'}
      } else {
        style = { 'border-right': 'none' }
      }
      
      if ($index === 0 || $index === 1) {
        style['border-top'] = '0.5px #CECECE solid';
      }

      return style;
    }


});

})();