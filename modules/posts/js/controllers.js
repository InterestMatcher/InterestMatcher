var postApp = angular.module('IMapp.posts.controllers', ['firebase']);

postApp.controller('PostController', function($scope){
    
	var fire = new Firebase("https://interestmatcher.firebaseio.com/");

    $scope.post = 
    {

    };
    
});


