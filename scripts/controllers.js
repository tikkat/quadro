var fourQuadrantsControllers = angular.module('fourQuadrantsControllers', []);

fourQuadrantsControllers.controller('mainController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

  $scope.formData = {};

  $scope.quadrants = [
    'Q1',
    'Q2',
    'Q3',
    'Q4'
  ];

  //when submitting the add form, send the text to the node API
  $scope.createTask = function() {
    console.log($scope.formData);
    $http.post('/api/tasks', $scope.formData)
      .success(function(data) {
        $scope.formData.text = ''; // clear the form in order to add a new task
        $rootScope.tasks = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // when landing on the page, get all tasks and show them
  $http.get('/api/tasks')
    .success(function(data) {
      $rootScope.tasks = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // delete a tasks after checking it
  $rootScope.deleteTask = function(id) {
    $http.delete('/api/tasks/' + id)
      .success(function(data) {
        $rootScope.tasks = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}]);
