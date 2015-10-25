
angular.module('postModule', ['ui.router', 'firebase']);


angular.module('postModule').controller('PostController', ['$scope','$stateParams', 'frontPagePosts', '$state',function ($scope,$stateParams,frontPagePosts, $state){
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
        console.log(post);
        return post.ID;        
    }
    

}]).controller('PostDetailsController', ['$state', '$scope' ,'$stateParams', 'getSinglePost',function ($state, $scope, $stateParams, getSinglePost) {
    
    $scope.closePost = function () {
        $state.go('homePage.allPosts');
    };
    
    $scope.singlePost = getSinglePost;
    console.log($scope.singlePost.author);
    
    
    
}]);

// This factory retrieves all posts on the front page.
angular.module('postModule').factory('frontPagePosts',['$firebaseArray',function($firebaseArray){
    
    console.log("Retrieving posts on the front page.");
    
    var ref = new Firebase('https://interestmatcher.firebaseio.com/posts/chill');
    
    return $firebaseArray(ref);
}]);


// This Factory retrieves a single post by ID. Lucas pls write this idk how to Fyrbaze.
angular.module('postModule').factory('getSinglePost',['$firebaseObject', '$stateParams' ,function($firebaseObject, $stateParams){
    
    var url = document.location.href;
    console.log("url:"+url);
    var useless ="https://interestmatcher.firebaseapp.com/#/home/posts/";
    var id  = url.substring(useless.length - 1);

    console.log("Retrieving single post by ID: "+ id);
    
    var ref = new Firebase('https://interestmatcher.firebaseio.com/posts/chill/'+id+"/");
    var array =  $firebaseObject(ref);
    
    array.$loaded().then(function(){
       console.log("Author:" + array.author); 
    });

    return array;
}]);