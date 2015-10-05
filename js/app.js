angular.module('IMapp', ['postsModule', 'profileModule', 'homeModule', 'firebase', 'ui.router', 'loginModule']);

angular.module('IMapp').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('homePage', {
        url: '/home',
        templateUrl: 'modules/home/home.html',
    });    

    $stateProvider.state('loginPage', {
        url: '/loginindex',
        templateUrl: 'loginindex.html',
        controller: 'LoginController'
    });
    
}]);


angular.module('IMapp').run(['$state', function($state) {
    $state.go('loginPage');
}]);