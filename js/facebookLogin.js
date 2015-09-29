/*
  This script allows users to login via facebook.
  
  Once the user logs in, it will check the database and see if they already exist.
  If the user exists, it does nothing. If the user does not exist, it will create a new one.

  Created by: Lucas Message (09/28/2015)

  EDITS (Name, date and change):


*/


// ------------------ Controller for login-----------------------//

// Use this controller with buttons and call the function "authFB()" with ng-click.
app.controller('loginCtrl', ["$scope", function($scope){

  $scope.authFB = authFB;

}]);


function authFB($scope){

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


// ---------------------- New User Check -------------------------//

// Listens for when user has been authenticated.

var isExistingUser = false;
var ref = new Firebase("https://interestmatcher.firebaseio.com/users");


ref.onAuth(function(authData){
  

  if (authData){
    
    // Check if user is in database.
    ref.once("value",function(snapshot){
      isExistingUser = snapshot.hasChild(authData.uid);
    }); 

    // Creates new user if it does not exist.
    if (!isExistingUser){
      ref.child(authData.uid).set({
        provider: authData.provider,
        name: getName(authData),
      })
    } 
  
    // TODO: Redirect user to another page or do other things.
  }
});

// Returns a good name for the user based on their login choice.
function getName(authData){
  switch(authData.provider){
    case "password":
      return authData.password.email.replace(/@.*/,'');
    case "facebook":
      return authData.facebook.displayName;
  }
}
