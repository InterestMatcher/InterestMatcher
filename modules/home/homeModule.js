
angular.module('homeModule', ['firebase', 'ui.router']);

angular.module('homeModule').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('homePage', {
        url: '/home',
        templateUrl: 'home.html',
        controller:'HomeController'
    });
}]);