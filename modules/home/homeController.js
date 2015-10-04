var app = angular.module('homeModule');

app.controller('ChatController',['$scope','publicChatMessages',
	function($scope, userPosts){

		console.log('psst');

		$scope.userPosts = userPosts;

		var fullID = mainRef.getAuth().uid;
		var fbString = "facebook:";

		$scope.facebookID = fullID.substring(fbString.length,fullID.length);
		console.log("Just the ID:"  + $scope.facebookID);
		// Function used to add a new post.
		$scope.addPost = function(){

			$scope.userPosts.$add({
				author: mainRef.getAuth().facebook.displayName,
				content: $scope.post,
				facebookID: $scope.facebookID,

			});

			console.log('Data sent?');
			// Reset title and content.
			//$scope.newPostTitle = '';
			$scope.post = '';
		}
	}
]);