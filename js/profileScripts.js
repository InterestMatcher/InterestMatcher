
angular.module('profileModule',['xeditable']);

var profileApp = angular.module('profileModule');

profileApp.controller('ProfileController', function($scope) {
    $scope.samplePerson = {
 		name : "Sujay",
 		location : "ACM",
 		rating : 5
    };
});
