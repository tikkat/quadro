var fourQuadrantsDirectives = angular.module('fourQuadrantsDirectives', []);

fourQuadrantsDirectives
  .directive('taskInput', function() {
    return {
      restrict: 'E',
      templateUrl: '/views/task-input.html'
    };
  })

  .directive('tasks', function($rootScope) {

    var linkFunction = function(scope, element, attributes) {
      scope.q = attributes['quadrant'];
    };

    return {
      restrict: 'E',
      scope: {
        q: '@quadrant'
      },
      templateUrl: '/views/tasks.html'
    };
  });
