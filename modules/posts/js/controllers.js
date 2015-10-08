
angular.module('IMapp.posts.controllers', []).controller('PostController', ['$scope', 'frontPagePosts', function ($scope, frontPagePosts){
    $scope.posts = frontPagePosts;
    
    var ref = new Firebase("https://interestmatcher.firebaseio.com/posts/chill.com");
    
    $scope.addPost = function(){
        $scope.posts.$add({
            author: ref.getAuth().facebook.displayName,
            title: "Hi, I am not a title!",
            date: new Date().toJSON(),
            content: $scope.content,
            comments: {}
        })
        
    }

}]).controller('PostDetailsController', ['$stateParams', '$state', '$scope', 'postService', function ($stateParams, $state, $scope, postService) {
    $scope.getPostById = function (id) {
    return postService.getPostById(id);
    };
    
    $scope.closePost = function () {
        $state.go('allPosts');
    };
    
    $scope.singlePost = $scope.getPostById($stateParams.id);
}]);