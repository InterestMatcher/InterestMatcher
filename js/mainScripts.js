
// Module initialization.
angular.module('homeModule', ['firebase', 'ui.router', 'luegg.directives']);

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
     $stateProvider.state('homePage.profile', {
     	url: '/profile/:profileID',
     	templateUrl: '../views/userAccountPage.html',
     	controller: 'ProfileController'
     });
     $stateProvider.state('homePage.map', {
     	url: '/map',
     	templateUrl: '../views/mapPage.html',
     	controller: 'MapController'
     });

}]);
// End of module initialization.


var app = angular.module('homeModule');

var mainRef = new Firebase("https://interestmatcher.firebaseio.com/");

app.controller('HomeController',['$scope', '$state', function($scope, $state){

	// Redirects user to login page if they are not logged in.
	checkIfLoggedIn($state);
	$scope.scrollChat = function(){
		// attempts to scoll to bottom of chat when chats are sumbitted
		var objDiv = document.getElementById("messageArea");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

    $state.go('homePage.allPosts');

		// Sets the username.
	$scope.username = mainRef.getAuth().facebook.displayName;
	$scope.getLoginMessage = function(){
		if (!mainRef.getAuth()){
			$state.go("loginPage");
			return "You are not logged in.";
		}
		else {
			return "You are logged in as "+ $scope.username + "; click here to logout.";
		}
	}
    $scope.logOut = function(user) {
        mainRef.unauth();
        $state.go('loginPage');
    };

   $scope.goToHomepage = function(){
     $state.go('homePage.allPosts');
   }

   $scope.goToProfile = function(){
     $state.go("homePage.profile", {profileID: mainRef.getAuth().uid.substring(9)});
   }

   $scope.goToMap = function(){
     $state.go('homePage.map');
   }

   $scope.goToCreatePost = function() {
     $state.go("homePage.createPost");
   }

}]);

app.controller('ChatController',['$scope','publicChatMessages',
	function($scope, publicChatMessages){

		$scope.messages = publicChatMessages;

		$scope.glued = true;

		var fullID = mainRef.getAuth().uid;
		var fbString = "facebook:";

		$scope.facebookID = fullID.substring(fbString.length,fullID.length);
		console.log("Facebook ID:"  + $scope.facebookID);

		// Adds a new post if the chat box input is valid
		$scope.addMessage = function(){
			if(isValidChat($scope.message))  {
				$scope.messages.$add({
					author: $scope.username,
					content: sanitizeChatInput($scope.message),
					facebookID: $scope.facebookID,
				});
			// Empty the text box when submitted.
			document.getElementById("chatTextBox").value = '';
			$scope.message = '';
			}
		}
	}
]);

// Returns an array containing all messages in the public chat.
app.factory('publicChatMessages', ['$firebaseArray',
	function($firebaseArray){
		console.log("Retrieving array of all public chat messages");

		// Gets the authenticated user.
		var userID = mainRef.getAuth().uid;

		console.log('userID: ' + userID);
		console.log('Chat message data retrieved?');
		return $firebaseArray(new Firebase('https://interestmatcher.firebaseio.com/chatrooms/public'));
	}
]);

// Checks to see whether or not a chat input is valid and should be rejected or accepted & sanitized
// @param String input
// @return boolean isValid
// @author whrobbins
function isValidChat(input)  {
	if(input === "")
		return false;
	if(input.length > 141) // Let's just say we've 1-up'ed Twitter
		return false;
	// TODO: add logic to return false if the new chat will be a duplicate of the last chat

	return true;
}


// Prevents users from chatting huge strings, empty strings, same string twice, etc
// @param String input: the unsanitized string to be processed
// @return the sanitized chat ready for sumbission
// @author whrobbins
function sanitizeChatInput(input)  {
	// Currently replaced by isValidChat.  Edit to add any changes to user input
	return input;
}

function scrollToBottomOfChat(){


}
