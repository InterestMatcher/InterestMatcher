angular.module('IMapp.profile.controllers', []).controller('ProfileController', function($scope){
    $scope.profiles= [
    {
      name: 'Sujay Khandekar',
      events_created: 3,
      prof_pic: 'pictures/sujay.jpg'
    }
  ]
  $scope.plusOne = function(index){
  	$scope.products[index].likes+=1;
  }
  $scope.minusOne = function(index){
  	$scope.products[index].dislikes+=1;
  }
});
