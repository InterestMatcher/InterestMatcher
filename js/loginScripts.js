/*

  This file contains all the code for logging in, which is used in the login page.

*/

// Module used when dealing with login stuff.
angular.module('loginModule', ['firebase', 'ui.router']);

// Sets up a view for the login screen.
angular.module('loginModule').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    $stateProvider.state('loginPage', {
        url: '/login',
        templateUrl: '../views/loginPage.html',
        controller: 'LoginController'
    });
    
}]);

// ------------------ Controller for login-----------------------//

var app = angular.module('loginModule');
var isExistingUser = false;
var mainRef = new Firebase("https://interestmatcher.firebaseio.com/");

// Use this controller with buttons and call the function "authFB()" with ng-click.
app.controller('LoginController', ["$scope", '$state', function($scope, $state){

  $scope.authFB = authFB;
  
  $scope.redirectToHome = function(){
		$state.go('homePage');
	}
  
  mainRef.onAuth(function(authData){
  
    console.log('User logged in');
    var ref = new Firebase("https://interestmatcher.firebaseio.com/users");
  
    if (authData){
      
      // Check if user is in database.
      ref.once("value",function(snapshot){
        isExistingUser = snapshot.hasChild(authData.uid);
      }); 
  
      // Creates new user if it does not exist.
      if (!isExistingUser){
        ref.child(authData.uid).update({
          provider: authData.provider,
          name: getName(authData),
          facebookID: authData.uid,
        })
      } 
      
          
   $scope.redirectToHome();
    }

  
});

}]);

function authFB(){

  var ref = new Firebase("https://interestmatcher.firebaseio.com/");

  // This is the angular fire function that does facebook authentication automatically.
  ref.authWithOAuthPopup("facebook", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);   
    }

  },
  {
    // This sets the permissions we get from facebook. "email" means we can get their email.
   scope: "email"
 }
 );

}

// Returns a good name for the user based on their login choice.
function getName(authData){
  switch(authData.provider){
    case "password":
      return authData.password.email.replace(/@.*/,'');
    case "facebook":
      return authData.facebook.displayName;
  }
}


function checkIfLoggedIn($state){
  var mainRef = new Firebase("https://interestmatcher.firebaseio.com/");
  if (mainRef.getAuth() == null){
    $state.go("loginPage");
  }
}
