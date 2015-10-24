angular.module('loginModule', ['firebase', 'ui.router']);

angular.module('loginModule').config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    $stateProvider.state('loginPage', {
        url: '/loginindex',
        templateUrl: 'loginindex.html',
        controller: 'LoginController'
    });
    
}]);

/*
  Allows for login via facebook.

  Created by: Lucas Message (09/28/2015)

  EDITS (Name, date and change):
    - Will Robbins, 9/30/2015, Fixed (I'm fairly sure) the problem of data not persisting between logins.

*/

var app = angular.module('loginModule');


var isExistingUser = false;

var mainRef = new Firebase("https://interestmatcher.firebaseio.com/");

// ------------------ Controller for login-----------------------//

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
