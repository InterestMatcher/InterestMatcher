angular.module('IMapp.posts.services',['firebase','ui.router']);

// This factory retrieves all posts on the front page.
angular.module('IMapp.posts.services').factory('frontPagePosts',['$firebaseArray',function($firebaseArray){
    
    console.log("Retrieving posts on the front page.");
    
    var ref = new Firebase('https://interestmatcher.firebaseio.com/posts/chill');
    
    return $firebaseArray(ref);
}]);


// This Factory retrieves a single post by ID. Lucas pls write this idk how to Fyrbaze.
angular.module('IMapp.posts.services').factory('getSinglePost',['$firebaseObject', '$stateParams' ,function($firebaseObject, $stateParams){
    

    console.log("Retrieving single post by ID: "+ $stateParams.ID);
    
    var ref = new Firebase('https://interestmatcher.firebaseio.com/posts/chill/'+$stateParams.ID+"/");
    var array =  $firebaseObject(ref);
    
    array.$loaded().then(function(){
       console.log("Author:" + array.author); 
    });

    return array;
}]);