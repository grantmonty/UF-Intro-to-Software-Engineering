angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      $scope.listings.push({name: $scope.name, code: $scope.code, coordinates: { latitude: $scope.coordinates.latitude, longitude: $scope.coordinates.longitude}, address: $scope.address })
      $scope.name='';
      $scope.code='';
      $scope.coordinates.latitude='';
      $scope.coordinates.longitude='';
      $scope.address='';
    };
    $scope.deleteListing = function(index) {

      $scope.listings.splice(index,1);
    };
    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
