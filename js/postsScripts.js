/*
  This file contains all the necessary code to load the posts and the details inside the post.

  Brief summary of how this all works:
    * PostsController is responsible for main list of posts.
    * PostDetailsController is responsible for the detailed post information when the user clicks on a post.

*/

// The module used by all things related to posts.
angular.module('postModule', ['ui.router', 'firebase', 'luegg.directives']);

// This controller is responsible for displaying the home page list of posts.
angular.module('postModule').controller('PostController', ['$scope','$stateParams', 'frontPagePosts', '$state',function ($scope,$stateParams,frontPagePosts, $state){
    
    // Uses the factory "frontPagePosts" to retrieve all the posts in Firebase and then puts them in the scope.
    $scope.posts = frontPagePosts;

    $scope.noPostsAvailableMessage = "There seems to be nothing in here.";

    // This is to ensure that the posts are loading properly. It is only fired after the posts have been fully loaded.
    $scope.posts.$loaded().then(function(){
        console.log("Number of elements in posts:" + $scope.posts.length)
        // Changes the message to be empty, because there are posts in the server.
        if ($scope.posts.length > 0)
          $scope.noPostsAvailableMessage = ""
    });

    // Set up a new firebase reference to where all posts are saved.
    // NOTE: All posts are saved to /chill, but in the future, they will also be saved in their interest group.
    var ref = new Firebase("https://interestmatcher.firebaseio.com/posts/chill");
    var postId = 0;

    var facebookID = ref.getAuth().uid;
    facebookID = facebookID.substring(9);
    console.log("The facebook ID for this user is: "+facebookID);

    // The function used in the scope to add a post.
    $scope.addPost = function(){
        $scope.posts.$add({
            author: ref.getAuth().facebook.displayName,
            authorID: facebookID,
            title: $scope.title,
            date: new Date().toJSON(),
            content: $scope.content,
        })
        
        // After the post is completely added, this will retrieve the ID of said post and add it to the post information.
        // This makes it easier to know which posts is being clicked on.
      .then(function(childRef) {
           postId = childRef.key();
           childRef.update({id:postId});
           $stateParams.ID = postId;
       })

      // Redired user back to the home page after the post is added.
      $state.go('homePage.allPosts');
    }    
    
    // Returns the id of any post that is passed in.
    $scope.getID = function(post){
        console.log(post);
        return post.id;        
    }

    // Redirects user to the post with the id given.
    $scope.goToPost = function(id){
      console.log("Redirecting to post of ID:" + id);
      $state.go("homePage.singlePost", {ID:id});
    }
    
// This controller is responsible for the details of a post that the user clicked on.
}]).controller('PostDetailsController', ['$state', '$scope' ,'$stateParams', 'getSinglePost', 'getCommentSection' ,function ($state, $scope, $stateParams, getSinglePost, getCommentSection) {
    
    // Retrieves the data of a single post with the id given.
    // The id is always saved to $stateParams when the user clicks on a post.
    $scope.singlePost = getSinglePost.getData($stateParams.ID);


    // Variables and functions for comments.
    var commentSectionRef = new Firebase("https://interestmatcher.firebaseio.com/comments/"+$stateParams.ID);

    $scope.comments = getCommentSection.getData($stateParams.ID);

    // Used to create a new comment.
    $scope.addComment = function(){
      $scope.comments.$add({
          author: mainRef.getAuth().facebook.displayName,
          authorID: mainRef.getAuth().uid.substring(9),
          date: new Date().toJSON(),
          content: $scope.content,
      });
    }

}]);

// This factory retrieves all posts on the front page.
angular.module('postModule').factory('frontPagePosts',['$firebaseArray',function($firebaseArray){

    console.log("Retrieving posts on the front page.");
    return $firebaseArray(new Firebase('https://interestmatcher.firebaseio.com/posts/chill'));

}]);

// This factory returns a service that has a function that can return a post if an id is given.
angular.module('postModule').factory('getSinglePost',['$firebaseObject', '$stateParams' ,function($firebaseObject, $stateParams){

    // This factory is different from the frontPagePosts factory because the factory does not reload the posts when another post
    // is clicked on. To FORCE it to always get the post is clicked on, this function is used.

    var service = {

      getData:  function(id){

          console.log("Retrieving single post by ID: "+ id);    
          // The post is found on firebase by appending its ID to the reference.
          var ref = new Firebase('https://interestmatcher.firebaseio.com/posts/chill/'+$stateParams.ID+"/");
          // Make sure that the post is returned as an object, not as an array.
          var post = $firebaseObject(ref);
          return post;
      }
    }

    return service;

   
}]);

angular.module('postModule').factory('getCommentSection',['$firebaseArray', '$stateParams' ,function($firebaseArray, $stateParams){

    // This factory is different from the frontPagePosts factory because the factory does not reload the posts when another post
    // is clicked on. To FORCE it to always get the post is clicked on, this function is used.

    var service = {

      getData:  function(id){

          console.log("Retrieving comments from post of ID: "+ id);    
          // The comment section is found on firebase by appending its post's ID to the reference.
          var ref = new Firebase('https://interestmatcher.firebaseio.com/comments/'+$stateParams.ID+"/");
          // Make sure that the comments are returned as an array, not as an object.
          var comments = $firebaseArray(ref);
          return comments;
      }
    }

    return service;

   
}]);