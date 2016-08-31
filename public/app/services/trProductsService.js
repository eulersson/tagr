(function() {
"use strict";

angular.module('app')
  .factory('trProductsService', function($cookies, $q, $http) {
    var factory = {
      addProduct: addProduct,
      getLogo: getLogo,
      removeProduct: removeProduct,
      defaultLogo: 'http://i.imgur.com/EOyYrK6.jpg',
      saveProductsAsCookie: saveProductsAsCookie,
      products: []
    }
    if ($cookies.getObject('products')) {
      factory.products = $cookies.getObject('products');
    }

    // Add an entry to the item list
    function addProduct() {
      factory.products.push({
        name: "",
        brand: "",
        before: "",
        after: "",
        logo: ""
      });
    }

    // Fetch logo from clearbit API
    function getLogo(name) {
      var defer = $q.defer();
      var logoUrl = 'https://logo.clearbit.com/' + name + '.com?size=50&greyscale=true';

      $http({ method: 'GET', url: logoUrl })
        .then(
          function success(res) {
            defer.resolve(logoUrl);
          },
          function error(res) {
            defer.resolve(factory.defaultLogo);
          }
        );
      return defer.promise;
    }

    // Remove item from the products list
    function removeProduct(product) {
      var index = factory.products.indexOf(product);
      factory.products.splice(index, 1);
    }

    function saveProductsAsCookie() {
      $cookies.putObject('products', factory.products);
    }

    return factory;

  })
})();