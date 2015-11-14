angular.module('IMapp', ['postModule', 'profileModule', 'homeModule', 'firebase', 'ui.router', 'loginModule', 'UserApp', 'UserApp.facebook-picture']);

angular.module('IMapp').run(['$state', function($state) {
    $state.go('loginPage');
}]);
