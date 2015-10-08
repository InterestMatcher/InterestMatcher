angular.module('IMapp.posts.services', []).factory('postService', function () {
    return {
        // insert backend fetch code
        //in the mean time here is this
        
        posts: [{
            id: 1,
            title: 'My first Post',
            content: 'Hello, World',
            permalink: 'first-post;',
            author: 'Lucas Message',
            date: '2014-10-3'
        }, {
            id: 2,
            title: 'Hang with me pls',
            content: 'I need friends. I am s lonely. I use Sublime Text. Maybe thats why no one like me.',
            permalink: 'whiny-post',
            author: 'Shotaro Ikeda',
            date: '2015-10-4'
        }],
        getAll: function () {
            return this.posts;
        },
        getPostById: function (id) {
            for ( var i in this.posts) {
                if (this.posts[i].id == id) {
                    return this.posts[i];
                }
            }
        },
    }
});

// This factory retrieves all posts on the front page.
angular.module('IMapp.posts.services').factory('frontPagePosts',['$firebaseArray',function($firebaseArray){
    
    console.log("Retrieving posts on the front page.");
    
    var ref = new Firebase('https://interestmatcher.firebaseio.com/posts/chill');
    
    return $firebaseArray(ref);
}])