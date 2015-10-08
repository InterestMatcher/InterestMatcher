
angular.module('homeModule', ['firebase', 'ui.router', 'postsModule']);

angular.module('homeModule').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('homePage', {
        url: '/home',
        templateUrl: 'home.html',
        controller:'HomeController'
    });
    $stateProvider.state('homePage.allPosts', {
        url: '/posts',
        templateUrl: 'modules/posts/views/posts.html',
        controller: 'PostController'
    });
    $stateProvider.state('homePage.singlePost', {
        url: '/posts/:id/:permalink',
        templateUrl: 'modules/posts/views/singlePost.html',
        controller: 'PostDetailsController'
    });
     $stateProvider.state('homePage.createPost', {
        url: '/submit',
        templateUrl: 'modules/posts/views/createPost.html',
        controller: 'PostController'
    });
}]);

