
/*
  Once the user logs in, it will check the database and see if they already exist.
  If the user exists, it does nothing. If the user does not exist, it will create a new one.
*/

// Created by: Lucas Message


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
      ref.child(authData.uid).update({
        provider: authData.provider,
        name: getName(authData),
      })
    } 
  
    // Redirects user to main page.
    angular.module('IMapp').run(['$state', function($state) {
    $state.go('allPosts');
}]);
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
