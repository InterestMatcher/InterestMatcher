// This factory retrieves all posts on the front page.
angular.module('IMapp.posts.services').factory('frontPagePosts',['$firebaseArray',function($firebaseArray){
    
    console.log("Retrieving posts on the front page.");
    
    var ref = new Firebase('https://interestmatcher.firebaseio.com/posts/chill');
    
    return $firebaseArray(ref);
}])
// This Factory retrieves a single post by ID. Lucas pls write this idk how to Fyrbaze

angular.module('IMapp.posts.services').factory('getSinglePost',[])