
var app = angular.module('homeModule');

// Returns an array containing all messages in the public chat.
app.factory('publicChatMessages', ['$firebaseArray', 
	function($firebaseArray){

		console.log("hi");

		// Gets the authenticated user.
		var userID = mainRef.getAuth().uid;

		console.log('userID:' + userID);

		// Finds the reference to the user's posts in the database.
		var ref = new Firebase('https://interestmatcher.firebaseio.com/chatrooms/public');

		console.log('data accessed?');

		return $firebaseArray(ref);
	}
]);