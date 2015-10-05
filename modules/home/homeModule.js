
angular.module('homeModule', ['firebase']);

angular.module('IMapp').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('homePage', {
        url: '/home',
        templateUrl: 'home.html',
        controller: 'ChatController'
    });
}]);