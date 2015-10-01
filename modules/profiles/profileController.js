var profileApp = angular.module('IMapp.profile.controllers', ['firebase'])

profileApp.controller('ProfileController', function($scope) {
    
    var fire = new Firebase("https://interestmatcher.firebaseio.com/");

    $scope.profiles = [
    {
      'name': 'Sujay Khandekar',
      'events_created': '3'
    }

   ];
   
});