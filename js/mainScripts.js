
// Module initialization.
angular.module('homeModule', ['firebase', 'ui.router']);

angular.module('homeModule').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
    $stateProvider.state('homePage', {
        url: '/home',
        templateUrl: '../views/homePage.html',
        controller:'HomeController'
    });
    $stateProvider.state('homePage.allPosts', {
        url: '/posts',
        templateUrl: '../views/postsPage.html',
        controller: 'PostController',
    });
    $stateProvider.state('homePage.singlePost', {
        url: '/posts/:ID',
        templateUrl: '../views/singlePostPage.html',
        controller: 'PostDetailsController'
    });
     $stateProvider.state('homePage.createPost', {
        url: '/submit',
        templateUrl: '../views/createPostPage.html',
        controller: 'PostController'
    });
     $stateProvider.state('homePage.openProfile', {
     	url: '/profile',
     	templateUrl: '../views/userAccountPage.html',
     	controller: 'ProfileController'
     });
}]);
// End of module stuff.


var app = angular.module('homeModule');

var mainRef = new Firebase("https://interestmatcher.firebaseio.com/");

app.controller('HomeController',['$scope', '$state', function($scope, $state){

	// Redirects user to login page if they are not logged in.
	if (mainRef.getAuth() == null){
		$state.go('loginPage');
	}
    $state.go('homePage.allPosts');
}]);
app.controller('ChatController',['$scope','publicChatMessages',
	function($scope, publicChatMessages){

		console.log('psst');

		$scope.messages = publicChatMessages;

		var fullID = mainRef.getAuth().uid;
		var fbString = "facebook:";

		$scope.facebookID = fullID.substring(fbString.length,fullID.length);
		console.log("Just the ID:"  + $scope.facebookID);
		
		// Function used to add a new post.
		$scope.addMessage = function(){

			$scope.messages.$add({
				author: mainRef.getAuth().facebook.displayName,
				content: $scope.message,
				facebookID: $scope.facebookID,

			});

			// empty the text box when submitted
			document.getElementById("chatBoxContent").value = '';
			
			// attempts to scoll to bottom of chat when chats are sumbitted
			var objDiv = document.getElementById("chatPane");
			objDiv.scrollTop = objDiv.scrollHeight;
			
			console.log('Data sent?');
			// Reset title and content.
			//$scope.newPostTitle = '';
			$scope.post = '';
		}
	}
]);

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