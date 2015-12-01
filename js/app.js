var app = angular.module("memoriesApp", ['ngRoute'])
  app.controller("HomeController", function($scope, $route, $routeParams, $location){
  })

  app.controller("YearController", function($scope, $http, $route, $routeParams, $location){
    $http.get('http://galvanize-service-registry.cfapps.io/api/v1/g12/kids-these-days/' + $routeParams.year).then(function(response){
      $scope.thisYear = response.data.rows;
      $scope.yearMsg = $routeParams.year;
      console.log("response", $scope.thisYear);
    })

  })

  app.controller("YearsController", function($scope, $http, $route, $routeParams, $location){

    $http.get('http://galvanize-service-registry.cfapps.io/api/v1/g12/kids-these-days').then(function(response){
      $scope.data = response;
      console.log('test');
    })

    $http.get('http://galvanize-service-registry.cfapps.io/api/v1/g12/kids-these-days/years').then(function(response){
      $scope.year = response.data;
      console.log("test");
      console.log("response", $scope.year);
    })

    $scope.postData = function(){
      $scope.obj = {
            "data": {
              "type": "memory",
              "attributes": {
                "old_days": $scope.post.kid,
                "these_days": $scope.post.now,
                "year": $scope.post.year
              }
            }
          }

      $http.post('http://galvanize-service-registry.cfapps.io/api/v1/g12/kids-these-days/memories', $scope.obj);
      $scope.post = {};
    }

  })

  app.config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/years/:year', {
        templateUrl: '/partials/year.html',
        controller: 'YearController',
      })
      .when('/', {
        templateUrl: 'partials/years.html',
        controller: 'YearsController',
      })
      .otherwise({redirectTo:'/'});
    $locationProvider.html5Mode(true)
  })
