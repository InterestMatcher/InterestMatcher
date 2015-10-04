angular.module('IMapp', ['postsModule', 'profileModule', 'firebase', 'ui.router', 'loginModule']);

angular.module('IMapp').run(['$state', function($state) {
    $state.go('loginPage');
}]);