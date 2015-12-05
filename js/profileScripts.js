angular.module('profileModule', ['firebase', 'ui.router']);

var profileApp = angular.module('profileModule');

profileApp.controller('ProfileController', function($scope) {

		var ref = new Firebase("https://interestmatcher.firebaseio.com/");

		$scope.user = {
      name: ref.getAuth().facebook.displayName,
			authID: ref.getAuth().uid,
    };
});
