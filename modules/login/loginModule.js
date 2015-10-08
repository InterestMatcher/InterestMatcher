

angular.module('loginModule', ['firebase', 'ui.router']);

angular.module('loginModule').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    $stateProvider.state('loginPage', {
        url: '/loginindex',
        templateUrl: 'loginindex.html',
        controller: 'LoginController'
    });
    
}]);
