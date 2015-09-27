var profileApp = angular.module('IMapp.profile.controllers', [])

profileApp.controller('ProfileController', function($scope) {
    $scope.profiles = [
    {
      'name': 'Sujay Khandekar',
      'events_created': '3'
    }
   ];
});
