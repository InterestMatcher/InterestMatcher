

angular.module('loginModule', ['firebase']);

angular.module('IMapp').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('loginPage', {
        url: '/loginindex',
        templateUrl: 'loginindex.html',
        controller: 'LoginController'
    });
}]);