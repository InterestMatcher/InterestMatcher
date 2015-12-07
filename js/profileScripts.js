angular.module('profileModule', ['firebase', 'ui.router']);

var profileApp = angular.module('profileModule');

profileApp.controller('ProfileController', ['$stateParams', '$scope', 'getProfileInformation', function($scope, $stateParams, getProfileInformation) {

	var ref = new Firebase("https://interestmatcher.firebaseio.com/");

	$scope.profileInfo = getProfileInformation.getData();
	
}]);

profileApp.factory("getProfileInformation", ["$firebaseObject", '$stateParams' ,function($firebaseObject, $stateParams){

    // This factory is different from the frontPagePosts factory because that factory does not reload the profile when another profile
    // is clicked on. To FORCE it to always get the profile clicked on, this function is used.

    var service = {

      getData:  function(){

          console.log("Retrieving profile of ID:"+ $stateParams.profileID);    
          // The profile is found on firebase by appending its ID to the reference.
          var ref = new Firebase('https://interestmatcher.firebaseio.com/users/facebook:'+$stateParams.profileID+"/");
          // Make sure that the post is returned as an object, not as an array.
          var profile = $firebaseObject(ref);
          return profile;
      }
    }

    return service;

   
}]);