/*
  Allows for login via facebook.

  Created by: Lucas Message (09/28/2015)

  EDITS (Name, date and change):
    - Will Robbins, 9/30/2015, Fixed (I'm fairly sure) the problem of data not persisting between logins.

*/

var app = angular.module('loginModule');

var mainRef = new Firebase("https://interestmatcher.firebaseio.com/");

// ------------------ Controller for login-----------------------//

// Use this controller with buttons and call the function "authFB()" with ng-click.
app.controller('LoginController', ["$scope", function($scope){

  $scope.authFB = authFB;

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
