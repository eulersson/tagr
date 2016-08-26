(function() {
"use strict";

angular.module('app')
  .factory('trProductsService', function($http) {
    var factory = {
      addProduct: addProduct,
      getLogo: getLogo,
      removeProduct: removeProduct
    }

    factory.products = [];

    function addProduct() {
      factory.products.push({
        name: "",
        brand: "",
        before: "",
        after: "",
        logo: ""
      });
    }

    function getLogo(logoUrl) {
      var defer = $q.defer();
    }

    function removeProduct(product) {
      var index = factory.products.indexOf(product);
      factory.products.splice(index, 1);
    }

    return factory;

  })
})();