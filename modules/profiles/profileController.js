var profileApp = angular.module('profileApp', [])

profileApp.controller('ProfileController', function($scope) {
    $scope.samplePerson = {
 		'name' : Sujay,
 		'location' : ACM,
 		'rating' : 5
    };
});