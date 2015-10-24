
angular.module('IMapp.posts.controllers', []).controller('PostController', ['$scope','$stateParams', 'frontPagePosts', '$state',function ($scope,$stateParams,frontPagePosts, $state){
    $scope.posts = frontPagePosts;
    
    var ref = new Firebase("https://interestmatcher.firebaseio.com/posts/chill");
    var id = 0;
    
    $scope.addPost = function(){
        $scope.posts.$add({
            author: ref.getAuth().facebook.displayName,
            title: $scope.title,
            date: new Date().toJSON(),
            content: $scope.content,
            comments: {}
        })
        
      .then(function(childRef) {
           id = childRef.key();
           childRef.update({ID:id});
           console.log("added record with id " + id);
           $stateParams.ID = id;
           console.log("Is state params right?: " + $stateParams.ID)
           $state.go('homePage.singlePost');
       })
    }    
    
    $scope.getID = function(post){
        return post.ID;        
    }
    

}]).controller('PostDetailsController', ['$state', '$scope' ,'$stateParams', 'getSinglePost',function ($state, $scope, $stateParams, getSinglePost) {
    
    $scope.closePost = function () {
        $state.go('homePage.allPosts');
    };
    
    $scope.singlePost = getSinglePost;
    console.log($scope.singlePost.author);
    
    
    
}]);