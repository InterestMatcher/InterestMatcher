
angular.module('postsModule', ['IMapp.posts.controllers', 'IMapp.posts.directives']);

angular.module('IMapp.posts').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('allPosts', {
        url: '/posts',
        templateUrl: 'modules/posts/views/posts.html',
        controller = 'PostController'
    });
    $stateProvider.state('singlePost', {
        url: '/posts/:id/:permalink',
        templateUrl: 'modules/posts/views/singlePost.html',
        controller: 'PostDetailsController'
    });
}]);