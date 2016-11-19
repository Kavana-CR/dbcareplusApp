
var dbcare = angular.module('dbcare');

dbcare.controller('ProfileCtrl',['$scope','$state', '$timeout', '$filter','$ionicLoading', '$ionicPopup', '$firebaseObject','$firebaseAuth','$ionicModal','$cordovaToast', 'ITEMREF','AUTHREF',function ($scope,$state,$timeout,$filter,$ionicLoading,$ionicPopup,$firebaseObject,$firebaseAuth,$ionicModal,$cordovaToast,ITEMREF,AUTHREF) 
{
 
  
   $ionicModal.fromTemplateUrl('views/modals/editprofilemodal.html', {
    scope: $scope
  }).then(function(editprofilemodal) {
    $scope.editprofilemodal = editprofilemodal;
  });
  
 $ionicModal.fromTemplateUrl('views/modals/changepasswordmodal.html', {
    scope: $scope
  }).then(function(password) {
    $scope.password = password;
  });

  $scope.showPassModal = function()
  {
  	$scope.pass = {};
  	$scope.password.show();
  }

  $scope.retrieveProfile = function(){

    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
    
    if(fbAuth){
    	console.log(fbAuth.password);
    	if(fbAuth.password!=undefined)
		{
    		var ref = ITEMREF.child(fbAuth.uid).child("profile");
    	    var obj = $firebaseObject(ref);
    	      obj.$loaded().then(function(x){
    	        x === obj;
    	        $scope.prof = obj;
    	        console.log("Success; ",obj);
    	      }).catch(function(error){
    	        console.log("Error: ",error);
    	      })
		}
    	else
    	{
    		$ionicLoading.show({
    		      template: '<center><ion-spinner class="spinner-energized" icon="lines"></ion-spinner></center><br><center>Edit option is disabled for Social logins</center>',
    		      duration: 1500
    		    });
    		$state.go("menu.settings");
    		
    	}
      
    }//end of if(fbAuth) 
    
    
  }//end of retrieveProfile function

$scope.editProfile = function(_p){
  var d = _p.dob;
  var fd = new Date(d);
  
    $scope.editprofilemodal.show();
    console.log("prof: ",_p);
    $scope.eprofile={
      name: _p.name,
      dob: fd,
      mobile: _p.mobile,
      email: _p.email
     
    };
    console.log("details; ",$scope.eprofile);
  }

  $scope.updateProfile = function(_eprofile){
    console.log("function is here");
    var d = $filter('date')(_eprofile.dob,'MMM d, y');
    var fd = d.toString();

    var fbAuth=$firebaseAuth(AUTHREF).$getAuth();
    if(fbAuth){
      var ref=ITEMREF.child(fbAuth.uid).child("profile");
      var obj=$firebaseObject(ref);

      obj.$loaded().then(function(x){
        x === obj;
        
        obj.name = _eprofile.name;
        obj.dob = fd;
        obj.mobile = _eprofile.mobile;
        obj.email = _eprofile.email;
        obj.$save().then(function(ref){
          ref.key()===obj.$id;
          $scope.editprofilemodal.hide();
          window.plugins.toast.showWithOptions({
    message: "Profile Updated Successfully",
    duration: "short", // 2000 ms
    position: "bottom",
    styling: {
      opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: '#242f24', // make sure you use #RRGGBB. Default #333333
      textColor: '#FFFFFF', // Ditto. Default #FFFFFF
      textSize: 15, // Default is approx. 13.
      cornerRadius: 10 // minimum is 0 (square). iOS default 20, Android default 100
      //horizontalPadding: 15, // iOS default 16, Android default 50
      //verticalPadding: 10 // iOS default 12, Android default 30
    }
  })//end of toast message

        },function(error){
          $scope.editprofilemodal.hide();
          window.plugins.toast.showWithOptions({
    message: error.message,
    duration: "long", // 2000 ms
    position: "bottom",
    styling: {
      opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: '#242f24', // make sure you use #RRGGBB. Default #333333
      textColor: '#FFFFFF', // Ditto. Default #FFFFFF
      textSize: 15, // Default is approx. 13.
      cornerRadius: 10 // minimum is 0 (square). iOS default 20, Android default 100
      //horizontalPadding: 15, // iOS default 16, Android default 50
      //verticalPadding: 10 // iOS default 12, Android default 30
    }
  })//end of toast message
        })
      })
    }//end of if(fbAuth)
  }//end of updateProfile() function


$scope.changepass = function(_pass)
{
$ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>Woki Woki Woki...</center>',

                });
if(_pass.npass == _pass.rpass )
{
  
  var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
  var authObj = $firebaseAuth(AUTHREF);
  if(fbAuth)
  {

  authObj.$changePassword({
  email: fbAuth.password.email,
  oldPassword: _pass.cpass,
  newPassword: _pass.npass
}).then(function() {
  $ionicLoading.hide(); //hide please wait spinner
  console.log("Password changed successfully!");
  $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>May The Force Be With You...</center>',
                  duration: 3000
                });
  $scope.password.hide();//hide the modal
  authObj.$unauth();
  $timeout(function () {
    $state.go("session");
    
  }, 3000);
  

}).catch(function(error) {
  $ionicLoading.hide(); //hide please wait spinner
  $scope.password.hide();//hide the modal
  console.error("Error: ", error);
  $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>The Dark Side Of The Force<br>No Saber For You <i class="icon ion-sad-outline"></i></center>',
                  duration: 3000
                });
});
}//end of if fbAuth
else
{
  $state.go("session");
} //end of else for if fbAuth







  

}//End of if passwords match

else
{
  $ionicLoading.hide(); //hide please wait spinner
$ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>Password Mismatch...</center>',
                  duration: 3000
                });
$scope.password.hide();//hide the modal
}//end of else




}//end of change pass function



$scope.changeemail = function()
{
    $scope.data = {email:null, pass:null};

  // An elaborate, custom popup
  var emailPopup = $ionicPopup.show({
    template: 'New Email*<input type="email" ng-model="data.email" required="yes"><br>Current Password*<input type="password" ng-model="data.pass" required="yesy">',
    title: 'Change Login Email',
    subTitle: 'This action will change your login email id',
    scope: $scope,
    buttons: [
      { text: 'Cancel', 
      type:'button-assertive'},
      {
        text: 'Update',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.email || !$scope.data.pass ) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data;
          }
        }
      }
    ]
  });

  

  emailPopup.then(function(res) {
    
    //First show a loading overlay to prevent further actions. with a please wait msg
    $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>Working...</center>',
                  
                });

    if(res == undefined)
    {
      emailPopup.close();
      $ionicLoading.hide();
      
    } //end of if

    else {
      

      var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
  var authObj = $firebaseAuth(AUTHREF);
  
    authObj.$changeEmail({oldEmail: fbAuth.password.email,
      newEmail: $scope.data.email,
      password: $scope.data.pass

    }).then(function() {
      //once email changed successfully close the previous loading and open a new one
      $ionicLoading.hide();
$ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>Updating...</center>',
                  
                });
      
  
  //After changing email successfully - update the profile with the new email//
      var ref=ITEMREF.child(fbAuth.uid).child("profile");
      var obj=$firebaseObject(ref);

      obj.$loaded().then(function(x){
        x === obj;
        
        obj.email = $scope.data.email;
        obj.$save().then(function(ref){
          //once email is saved to database close previous loading and open a new one
          $ionicLoading.hide();
          ref.key()===obj.$id;
          //Show a sucess message on success and close it after 2 seconds
          $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>Lets Go For A Ride! </center>',
                  duration: 2000
                });
          authObj.$unauth();
  $timeout(function () {
    $state.go("session");
    
  }, 2000);
          
        },function(error){
          
          //on error display a toast msg of error
          emailPopup.close();
          window.plugins.toast.showWithOptions({
    message: error.message,
    duration: "long", // 2000 ms
    position: "bottom",
    styling: {
      opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: '#242f24', // make sure you use #RRGGBB. Default #333333
      textColor: '#FFFFFF', // Ditto. Default #FFFFFF
      textSize: 15, // Default is approx. 13.
      cornerRadius: 10 // minimum is 0 (square). iOS default 20, Android default 100
      //horizontalPadding: 15, // iOS default 16, Android default 50
      //verticalPadding: 10 // iOS default 12, Android default 30
    }
  })//end of toast message  


        })//end of $save

      })//end of $loaded












}).catch(function(error) {
  $ionicLoading.hide();
  $ionicLoading.show(
                {
                  template: '<center><ion-spinner class="spinner-balanced" icon="ios"></ion-spinner><br>'+error.message+'</center>',
                  duration: 3500
                });
  
}); //end of $changeEmail

 }//end of else 

  }); //end of then for emailPopup

  
}//end of function



}])// end of ProfileCtrl
