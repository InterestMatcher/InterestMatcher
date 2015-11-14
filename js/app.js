angular.module('IMapp', ['postModule', 'profileModule', 'homeModule', 'firebase', 'ui.router', 'loginModule', 'UserApp.facebook-picture']);

angular.module('IMapp').run(['$state', function($state) {
    $state.go('loginPage');
}]);
