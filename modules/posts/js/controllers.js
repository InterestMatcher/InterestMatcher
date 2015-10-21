
angular.module('IMapp.posts.controllers', []).controller('PostController', ['$scope', 'frontPagePosts', function ($scope, frontPagePosts){
    $scope.posts = frontPagePosts;
    
    var ref = new Firebase("https://interestmatcher.firebaseio.com/posts/chill");
    
    $scope.addPost = function(){
        $scope.posts.$add({
            author: ref.getAuth().facebook.displayName,
            title: $scope.title,
            date: new Date().toJSON(),
            content: $scope.content,
            comments: {}
        })
        
     //   .then(function(childRef) {
       //     var id = childRef.key();
         //   console.log("added record with id " + id);
       // }
    }

    

}]).controller('PostDetailsController', ['$stateParams', '$state', '$scope', function ($stateParams, $state, $scope) {
    
    $scope.closePost = function () {
        $state.go('.allPosts');
    };
    
    $scope.singlePostLink = $stateParams.permalink;
}]);