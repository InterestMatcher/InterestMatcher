
angular.module('homeModule', ['firebase']);

angular.module('homeModule').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'home.html',
        controller: 'ChatController'
    });
}]);