var fourQuadrantsFilters = angular.module('fourQuadrantsFilters', []);

fourQuadrantsFilters.filter('reverse', function() {
  return function(items) {
    if(items !== undefined)
      return items.slice().reverse();
  };
});
