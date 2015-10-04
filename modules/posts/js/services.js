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
            for (var i in this.posts) {
                if (this.posts[i].id == id) {
                    return this.posts[i];
                }
            }
        },
    }
});