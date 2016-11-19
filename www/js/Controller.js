angular.module('starter.controllers', [])

/**
 *	Login Screen controller. takes scope, ionic loading, firebase auth, AUTHREF a constant that is declared in app.js,
 *	state to navigate to different views and ionic Modal to show the forgot password modal
 *	Mentioned in -> [ <- are dependencies and should be passed as variables in the function in SAME ORDER!!! ***IMPORTANT***
 */
.controller('LoginCtrl', ['$scope', '$filter','$ionicLoading','$timeout', '$firebaseObject','$firebaseAuth', 'AUTHREF', '$state', '$ionicModal','Auth','$cordovaOauth', function LoginCtrl($scope,$filter, $ionicLoading, $timeout,$firebaseObject, $firebaseAuth, AUTHREF, $state, $ionicModal,Auth,$cordovaOauth, $ionicSlideBoxDelegate) {

            console.log("Login Controller");
/** This function checks if the user has a login session that is active.
If Active it will re-direct user to home page else it will redirect user to login page**/
var displayName="",userEmail="",uid="";
$scope.checkSession = function()
{
   $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="lines"></ion-spinner><br>Getting ready for tea party...<i class="icon ion-wineglass"></i></center>',

                });

var fbAuth = $firebaseAuth(AUTHREF).$getAuth();

       if(fbAuth)
       {
        $timeout(function () {
    $ionicLoading.hide();
        $state.go("menu.home");
    
  }, 6000);
        
       }
       else
       {

        $timeout(function () {
    $ionicLoading.hide();
        $state.go("login");
    
  }, 3000);
       }


}//end of check session function

/**** This function takes the email entered by user and sends them an email with temporary password.
users must login using the temporary password within 24hrs and must reset their password.
The validation of , if the user is entering an email that is registered in the database is handled by firebase ****/
$scope.sendForgot = function(_fmail)
              {

                 $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner><br>Please Wait...</center>',

                });

                var fbAuth = $firebaseAuth(AUTHREF);
                fbAuth.$resetPassword({
                  email : _fmail
                }).then(function(){
                 $ionicLoading.hide();
                 $ionicLoading.show(
                {
                  template: '<center>An email has been sent to ' +_fmail+ '<br>Please follow the instruction to reset password.</center>',
                  duration: 4000  
                });
                 $scope.forgot.hide();

                }).catch(function(error){
                  $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner><br>' +error.message+ '</center>',
                  duration: 2000  
                });
                  $scope.forgot.hide();
                })


              }//end of sendForgot function

/* ***hideErr function clears the error message returned from firebase during login process*

			   	When entered a wrong password or email, firebase returns an error message which is displayed
			    but does not clear out when re-entering email / password. This function clears it as to display the
			    next error msg received if any during successive login tries
			  */
			 $scope.hideErr = function()
			 {
                $scope.loginError = false;
             };
             /**
              * login function authenticates the user on to firebase
              * Takes _credentials as a parameter. which contains email and password entered by user.
              */
            $scope.login = function (_credentials)
            {
				//ionicLoading is the loading msg that is shown while authentication check happens in background
				//there by, blocking the user from any other action during authentication process.
				//icon in spinner and class change the icon and the color of spinner refer ionic docs for more spinner icons.
                $ionicLoading.show(
                {
                	template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>Logging in... Please Wait</center>'
                });

				// firebaseAuth takes AUTHREF(see app.js) as the paramenter and the firebase service authWithPassword to authenticate users.
				// authWithPassword takes email and password as JSON strings {email: , password: }

                $firebaseAuth(AUTHREF).$authWithPassword(_credentials)
                .then(function (authData)
                {
                        //Do things if successful
                        console.log("Logged in as:", authData.uid);

                        //hide ionicloading after successful authentication
                        $ionicLoading.hide();

                        $ionicLoading.show(
                        {
					      template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>Login Successful!</center>',
					      duration: 1500
                        });
                        //use $state service to go to home screen
                        $state.go('menu.home', {});

                }).catch(function (error)
                {

                        //if authentication error then hide ionicloading
                        $ionicLoading.hide();
                        console.error("Authentication failed:", error);
                        //display the error msg returned from firebase.
                        $ionicLoading.show(
                        {
					      template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>' + error.message + ' Login Failed!</center>',
					      duration: 2500
                        });
                });
            };
            /**
             *	brings up the forgot password modal.
             * 	Modal is stored in a separate location hence the usage of & path in fromTemplateUrl
             */
            $ionicModal.fromTemplateUrl('views/modals/forgotmodal.html',
            {
			    scope: $scope,
			    animation: 'slide-in-up'
            }).then(function(forgot) {
            	$scope.forgot = forgot;
            });
            /**
             * modal for adding Personal data for OAuth providers
             */
            $ionicModal.fromTemplateUrl('views/modals/addPersonalData.html', {
        	    scope: $scope
        	  }).then(function(addPersonalData) {
        	    $scope.addPersonalData = addPersonalData;
        	    
        	  });
            $scope.addPersonalDat=function(_tel,_dob)
            {
            	var obj = AUTHREF.child('dbcare').child(uid);
                var prof = $firebaseObject(obj);
                var d = $filter('date')(_dob, 'MMM d, yy');
            	prof.profile={
                        name: displayName,
                        email: userEmail,
                        mobile: _tel,
                        dob: d.toString()
                      };
            	prof.$save().then(function(ITEMREF){
                    console.log(prof.$id);
                    $scope.addPersonalData.hide();
                    $state.go('tour2',{});
                    }, function(error){
                      alert("ERROR: ",error);
                    });
            	
            }
            /**
             * Facebook login
             * APPID:478318845698536 scope: email
             * Gets the access token and authenticates with firebase
             */
             $scope.loginWithFB = function() {
             	//scope is currently email and more variables can be added to it
           	  $cordovaOauth.facebook("478318845698536", ["email"]).then(function(result) {
                     Auth.$authWithOAuthToken("facebook", result.access_token).then(function(authData) {
                    	 $ionicLoading.show({
                             template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>Please wait while we log you in</center>',
                             duration: 1500
                           });
                    	 $ionicLoading.hide();
                    	 $scope.addPersonalData.show();
                    	 console.log(JSON.stringify(authData));
                         displayName=authData.facebook.displayName;
                         userEmail=authData.facebook.email;
                         uid=authData.uid;                        
                     }, function(error) {
                         alert(error);
                     });
                 }, function(error) {
                     alert("ERROR2: " + error);
                 });
            	
             };
             /**
              * Google login
              * APPID:918293575022-3jscj4lbknkf204irbm4r8dbspleiv03.apps.googleusercontent.com scope: email
              * Gets the access token and authenticates with firebase
              */
              $scope.loginWithGoogle = function() {
              	//scope is currently email and more variables can be added to it
            	  $cordovaOauth.google("918293575022-3jscj4lbknkf204irbm4r8dbspleiv03.apps.googleusercontent.com", ["email"]).then(function(result) {
                      Auth.$authWithOAuthToken("google", result.access_token).then(function(authData) {
                          console.log(JSON.stringify(authData));
                          $ionicLoading.show({
                              template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>Please wait while we log you in</center>',
                              duration: 1500
                            });
                          $ionicLoading.hide();
                          $scope.addPersonalData.show();
                          displayName=authData.google.displayName;
                          userEmail=authData.google.email;
                          uid=authData.uid; 
                      }, function(error) {
                          alert("ERROR1: " + error);
                      });
                  }, function(error) {
                      alert("ERROR2: " + error);
                  });
              }; //end of login with google function







        }])

/**
 *	SignUp Screen controller. takes scope, ionic loading, firebase auth, AUTHREF a constant that is declared in app.js,
 *	state to navigate to different views and ionic Modal to show the forgot password modal
 *	Mentioned in -> [ <- are dependencies and should be passed as variables in the function in SAME ORDER!!! ***IMPORTANT***
 */
.controller('SignUpCtrl', ['$scope', '$ionicLoading', '$firebaseAuth', 'AUTHREF', '$state', function SignUpCtrl($scope, $ionicLoading, $firebaseAuth, AUTHREF, $state) {
console.log("Sign Up Controller");

/* *hideErr function clears the error message returned from firebase during sign up process*

   *When entered a email that is already registered, firebase returns an error message which is displayed
     but does not clear out when re-entering email. This function clears it as to display the
     next error msg received if any during successive sign up tries */

 $scope.hideErr = function(){
    $scope.creds = {};
    $scope.regError = false;
};

//signup function creates an account on firebase
//Takes _credentials as a parameter. which contains email and password entered by user.

 $scope.signup = function(_credentials) {

//ionicLoading is the loading msg that is shown while registration happens in background
//there by, blocking the user from any other action during registration process.

               $ionicLoading.show({
      template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>Signing Up... Please Wait</center>'
    });

//firebaseAuth takes AUTHREF(see app.js) as the paramenter and the firebase service createUser to create a user in firebase.
// createUser takes email and password as JSON strings {email: , password: }
            var authObj = $firebaseAuth(AUTHREF);
            authObj.$createUser(_credentials).then(function(userData) {
                        //Do things if successful. Authenticate user and direct him to tour wizard
                        return authObj.$authWithPassword(_credentials);

                        console.log('User creation success', userData.uid);

                        
                       

                    }).then(function(authData){
                      //use $state service to go to tour screen.
                      //hide ionicloading after successful registration
                        $ionicLoading.hide();
                        $ionicLoading.show({
      template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>Sign Up Successful...</center>',
      duration: 1500
    });
                       $state.go('tour',{});
                    }).catch(function(error) {

                        // do things if failure
                         $ionicLoading.hide();

                        console.error("Unable to create user", error);

                        $ionicLoading.show({
      template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>' + error.message + ' Sign Up Failed!</center>',
      duration: 2500
    });
                    });


        };



    }]) // end of controller


.controller('TourCtrl',['$scope','$filter','$firebaseArray','$firebaseAuth','$firebaseObject', 'ITEMREF', 'AUTHREF', '$state', function ($scope, $filter, $firebaseArray, $firebaseAuth, $firebaseObject, ITEMREF, AUTHREF,$state)
    {
      $scope.addProfile = function(_fname,_tel,_dob)
      {
        var authObj = $firebaseAuth(AUTHREF).$getAuth();
        console.log(authObj.uid);
        console.log(_fname,_tel,_dob);
        var d = $filter('date')(_dob, 'MMM d, y');
        var fd = d.toString(); //filtered date to string type
        var obj = ITEMREF.child(authObj.uid);
        var prof = $firebaseObject(obj);

        

         
        prof.profile={
          name: _fname,
          mobile: _tel,
          email: authObj.password.email,
          dob: fd

        };

    prof.$save().then(function(obj){
    console.log(prof.$id);
    
    }, function(error){
      console.log("ERROR: ",error);
    });

   
   var remObj = ITEMREF.child(authObj.uid).child("reminders");
        var remSet = $firebaseObject(remObj);

        remSet.Settings = {
        
        firstTime : true,
        alarmToggle : false,
     editAlarmsIcon : false,
     showAlarms : false,
     breakfastTime : "null",
     lunchTime : "null",
     dinnerTime : "null",
     repeat : false,
     alarmBlood : false,
     bloodLogNotify : false

   };

   remSet.$save().then(function(remObj){
    console.log(remSet.$id);
    $state.go('tour2');
   }, function(error){
    console.log("ERROR: ",error);
   });



      }//add Profile function ends.

    }])



.controller('MenuCtrl',['$scope','$firebaseAuth','$firebaseObject', '$ionicLoading','$state', 'AUTHREF', 'ITEMREF', function MenuCtrl ($scope, $firebaseAuth, $firebaseObject, $ionicLoading, $state, AUTHREF, ITEMREF){

 
$scope.logout = function()
{
 
 var fbAuth = $firebaseAuth(AUTHREF);

fbAuth.$unauth();
$state.go('session');

}//end of logout function


}])//end of MenuCtrl


.controller('AboutCtrl',['$scope', '$ionicPopup', function($scope, $ionicPopup) {

 $scope.showReuben = function() {
   var alertReuben = $ionicPopup.alert({
  title: 'Project Developer', 
  subTitle: 'SRH Hochschule Heidelberg',
  template: '<div class="list"><a class="item item-thumbnail-left item-text-wrap"><img src="img/Reuben.png"><h2>Reuben Borrison</h2><p>11008021</p><p>M.Sc Applied Computer Science</p></a>',
  okType: 'button-balanced'
});

   alertReuben.then(function(res) {
     alertReuben.close();
   });
 }//end of show reuben

  $scope.showAbhi = function() {
   var alertAbhi = $ionicPopup.alert({
  title: 'Project Developer', 
  subTitle: 'SRH Hochschule Heidelberg',
  template: '<div class="list"><a class="item item-thumbnail-left item-text-wrap"><img src="img/Abhi.png"><h2>Abhijith Darshan</h2><p>11007138</p><p>M.Sc Applied Computer Science</p></a>',
  okType: 'button-calm'
});

   alertAbhi.then(function(res) {
     alertAbhi.close();
   });
 }//end of show reuben

  $scope.showVishakha = function() {
   var alertVishakha = $ionicPopup.alert({
  title: 'Project Developer', 
  subTitle: 'SRH Hochschule Heidelberg',
  template: '<div class="list"><a class="item item-thumbnail-left item-text-wrap"><img src="img/Vishakha.jpg"><h2>Vishakha Jangida</h2><p>11008109</p><p>M.Sc Applied Computer Science</p></a>',
  okType: 'button-royal'
});

   alertVishakha.then(function(res) {
     alertVishakha.close();
   });
 }//end of show reuben

  $scope.showSharan = function() {
   var alertSharan = $ionicPopup.alert({
  title: 'Project Developer', 
  subTitle: 'SRH Hochschule Heidelberg',
  template: '<div class="list"><a class="item item-thumbnail-left item-text-wrap"><img src="img/Sharan.png"><h2>Sharan Kasandula</h2><p>11007845</p><p>M.Sc Applied Computer Science</p></a>'
});

   alertSharan.then(function(res) {
     alertSharan.close();
   });
 }//end of show reuben

  $scope.showKavana = function() {
   var alertKavana = $ionicPopup.alert({
  title: 'Project Developer', 
  subTitle: 'SRH Hochschule Heidelberg',
  template: '<div class="list"><a class="item item-thumbnail-left item-text-wrap"><img src="img/Kavana.png"><h2>Kavana Ramaiah</h2><p>11007799</p><p>M.Sc Applied Computer Science</p></a>',
  okType: 'button-energized'
});

   alertKavana.then(function(res) {
     alertKavana.close();
   });
 }//end of show reuben




}])
    