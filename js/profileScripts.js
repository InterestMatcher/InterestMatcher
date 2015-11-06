angular.module('profileModule',['xeditable']);

var profileApp = angular.module('profileModule');

profileApp.controller('ProfileController', function($scope) {
    $scope.user = {
      name: mainRef.getAuth().facebook.displayName,
    };
});
