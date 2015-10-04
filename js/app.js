angular.module('IMapp', ['postsModule', 'profileModule', 'firebase', 'ui.router']);

angular.module('IMapp').run(['$state', function($state) {
    $state.go('allPosts');
}]);