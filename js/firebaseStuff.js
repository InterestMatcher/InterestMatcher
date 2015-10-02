/*

	#------------Summary-------------#

	This is the firebase document where all functions, controllers
	and things involving firebase data will be.

	Created by: Lucas Message (09/30/2015)

	EDITS (name, date and change):

*/

var firebaseApp = angular.module('firebaseApp',['firebase']);
var mainRef = new Firebase('https://interestmatcher.firebaseio.com/');



/* POSTS

	This is what the userPosts contains:
		title, author, text

*/

// Returns an array containing all posts by this user.
firebaseApp.factory('userPosts', ['$firebaseArray', 
	function($firebaseArray){

		console.log("hi");

		// Gets the authenticated user.
		var userID = mainRef.getAuth().uid;

		console.log('userID:' + userID);

		// Finds the reference to the user's posts in the database.
		var ref = new Firebase('https://interestmatcher.firebaseio.com/posts');

		console.log('data accessed?');

		return $firebaseArray(ref);
	}
]);

firebaseApp.controller('PostCtrl',['$scope','userPosts',
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

/* CHAT ROOMS

	The public chatroom is every anyone can talk with anyone....

*/
/*
firebaseApp.factory('publicChatMessages',['$firebaseArray',
	function($firebaseArray){
		
		// Main public chatroom that anyone can write to.
		//var ref = new Firebase('https://interestmatcher.firebaseio.com/chatrooms/public');

		return $firebaseArray(ref);
	}
]);

firebaseApp.controller('publicChatController',['$scope','$publicChatMessages',

	function($scope, publicChatMessages){

		$scope.user = mainRef.getAuth().uid;
		$scope.chatMessages = publicChatMessages;

		$scope.addMessage = function(){
			
			$scope.chatMessages.$add({
				from: $scope.user,
				content: $scope.newMessageText,
			});

			$scope.newMessageText = '';
			
		}
	}
]);
*/