var fourQuadrantsFilters = angular.module('fourQuadrantsFilters', []);

fourQuadrantsFilters.filter('reverse', function() {
  return function(items) {

      return items.slice().reverse();
  };
});
