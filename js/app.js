angular.module('IMapp', ['postModule', 'profileModule', 'homeModule', 'firebase', 'ui.router', 'loginModule', 'luegg.directives']);

angular.module('IMapp').run(['$state', function($state) {
    $state.go('loginPage');
}]);
