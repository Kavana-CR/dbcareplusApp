var dbcare = angular.module('dbcare');

dbcare.controller('ReminderCtrl', ['$scope', '$cordovaLocalNotification', '$ionicModal', '$firebaseAuth','$firebaseObject','$filter','AUTHREF','ITEMREF', function ($scope, $cordovaLocalNotification, $ionicModal, $firebaseAuth, $firebaseObject, $filter, AUTHREF, ITEMREF) 

{

   $ionicModal.fromTemplateUrl('views/modals/remindermodal.html', {
    scope: $scope
  }).then(function(reminderModal) {
    $scope.reminderModal = reminderModal;
  });


  // get all reminder settings
  $scope.Settings = {};
  $scope.showEmptyCards = false;
  $scope.showReminderRepeatCards = false;
  $scope.showReminderCards = false;


 $scope.getRem = function ()
  {
    console.log("inside init");

    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
if(fbAuth)
{
  var ref = ITEMREF.child(fbAuth.uid).child("reminders");
  var obj = $firebaseObject(ref);
  obj.$loaded().then(function(ref){
        ref === obj;
        $scope.Settings = obj;

        if($scope.Settings.Settings.firstTime == true)
        {
          $scope.showEmptyCards = true;
        }
        else
        {
          $scope.showReminderCards = true;
          $scope.showReminderRepeatCards = false;
          $scope.showEmptyCards = false;
        }


         if($scope.Settings.Settings.repeat == true && $scope.Settings.Settings.firstTime == false)
        {
          $scope.showReminderRepeatCards = true;
          $scope.showReminderCards = false;
          $scope.showEmptyCards = false;
        }
        if($scope.Settings.Settings.repeat == false && $scope.Settings.Settings.firstTime == false)
        {
          $scope.showReminderCards = true;
          $scope.showReminderRepeatCards = false;
          $scope.showEmptyCards = false;

        }
      }).catch(function(error){
        console.log("Error: ",error);
      })



}
 
}// end of getRem

$scope.settingsOfReminders = function(_s)
{ 
  $scope.reminderModal.show();
  
  //Get Settings From Firebase and Assign it to toggles and ng-show.
 
 $scope.alarmToggle = {value:_s.alarmToggle}; /*on toggling get notified for breakfast,lunch and dinner clock is displayed*/
 console.log("Firebase value for Alarm Toggle: ", $scope.alarmToggle);
 $scope.alarmBlood = {value:_s.alarmBlood};  /*on toggling get notified to check blood sugar after breakfast lunch and dinner Bloodlognotify is shown*/
 console.log("Firebase value for Alarm Blood: ", $scope.alarmBlood);
 $scope.repeatChoice = {value:_s.repeat}; /*This is for repeat everyday notification*/
 console.log("Firebase value for Repeat Choice: ", $scope.repeatChoice);
 $scope.bloodLogNotify = _s.bloodLogNotify;
 console.log("Firebase value for Blood Log Notify: ", $scope.bloodLogNotify);
 $scope.editAlarmsIcon = _s.editAlarmsIcon;
 console.log("Firebase value for Edit Alarms icon: ", $scope.editAlarmsIcon);
 $scope.showAlarms = _s.showAlarms;
 console.log("Firebase value for ShowAlarms: ", $scope.showAlarms);
 $scope.firstTime = _s.firstTime;
 console.log("Firebase value for First Time: ", $scope.firstTime);


 if($scope.firstTime == true) //if it is the first time then show current time
 {   

  var bTime = new Date();
  bTime = $filter('date')(bTime, 'MMM d, y HH:mm');
  $scope.breakfastTime = new Date(bTime);
  console.log("First Time Breakfast", $scope.breakfastTime);

  var lTime = new Date();
  lTime = $filter('date')(lTime, 'MMM d, y HH:mm');
  $scope.lunchTime = new Date(lTime);
  console.log("First time Lunch",$scope.lunchTime);

  var dTime = new Date();
  dTime = $filter('date')(dTime, 'MMM d, y HH:mm');
  $scope.dinnerTime = new Date(dTime);
  console.log("First Time Dinner", $scope.dinnerTime);

 } 



 else { // show the time that is in firebase

  var bTime = _s.breakfastTime;
  var b = new Date();
  b = $filter('date')(b, 'MMM d, y');
  bTime = b+' '+ bTime;
  console.log("Convert string to date type Breakfast:",bTime);
  $scope.breakfastTime = new Date(bTime);

  var lTime = _s.lunchTime;
  var l = new Date();
  l = $filter('date')(l, 'MMM d, y');
  lTime = l +' '+ lTime;
  console.log("Convert string to date type Lunch",lTime);
  $scope.lunchTime = new Date(lTime);

  var dTime = _s.dinnerTime;
  var d = new Date();
  d = $filter('date')(d, 'MMM d, y');
  dTime = d +' '+ dTime;
  console.log("Convert string to date type Dinner",dTime);
  $scope.dinnerTime = new Date(dTime);


}

}
 

  

$scope.showCard = function() /*This functions shows the clock section to set reminders for breakfast,lunch and dinner*/
{


  //Breakfast

  if ($scope.alarmToggle.value == true) /*If get notified for Alarms is true then show the clock*/
  {
    $scope.showAlarms = true;

  }
  else
  {
    $scope.showAlarms = false;  /*this hides the Alarms card if you turn it off*/
    $scope.editAlarmsIcon = false; /*This hides the edit down arrow icon for Alarms if you turn reminders off.*/
     $scope.showEmptyCards = true;
     $scope.showReminderCards = false;
     $scope.showReminderRepeatCards = false;


    var authObj = $firebaseAuth(AUTHREF).$getAuth();
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
    $scope.reminderModal.hide();
    $scope.getRem();
    
   }, function(error){
    console.log("ERROR: ",error);
    $scope.reminderModal.hide();
   }) 
    


    cordova.plugins.notification.local.schedule([{
    id: 1,
    text: "Reminders Are OFF For Breakfast!",
    title: "DBcare+",
    led: "ADDFFF",
    icon: "file://img/icon.png"
},{
    id: 2,
    text: "Reminders Are OFF For Lunch!",
    title: "DBcare+",
    led: "ADDFFF",
    icon: "file://img/icon.png"
  },{
    
    id: 3,
    text: "Reminders Are OFF For Dinner!",
    title: "DBcare+",
    led: "ADDFFF",
    icon: "file://img/icon.png"

}])
 
  }

 

}


$scope.showAlarmsCard = function()
{
  $scope.showAlarms = true;
  $scope.editAlarmsIcon = false;

}

$scope.showBloodLogNotifyCard = function()
{
if ($scope.alarmBlood.value == true)
  {
    $scope.bloodLogNotify = true; /*This shows the alarmBloodLogNotify card*/
  }
  else
  {
    $scope.bloodLogNotify = false; /*This hides the alarmBloodLogNotify card*/
  }

} 



//Add notification for Alarms
$scope.addNotification = function (_breakfastTime, _lunchTime,_dinnerTime)
{
  console.log("Inside Add notification function");
  var bTime = _breakfastTime;
  var lTime = _lunchTime;
  var dTime = _dinnerTime;
  console.log("Getting Input Times Breakfast, Lunch, Dinner", bTime,lTime,dTime);
  
  $scope.showAlarms = false;
  $scope.editAlarmsIcon = true;
  

//if repeat equals false then don't add every parameter

  if ($scope.repeatChoice.value == false || $scope.repeatChoice.value == null )
  {
console.log("Inside false condition");
console.log(_breakfastTime);

var fbAuth = $firebaseAuth(AUTHREF).$getAuth(); 
console.log(fbAuth.uid);
if(fbAuth)
{
  bTime = $filter('date')(bTime, 'HH:mm');
  bTime = bTime.toString();
  console.log("Time converted to string to update to firebase", bTime);

  lTime = $filter('date')(lTime, 'HH:mm');
  lTime = lTime.toString();
  console.log("Time converted to string to update to firebase", lTime);
  
  dTime = $filter('date')(dTime, 'HH:mm');
  dTime = dTime.toString();
  console.log("Time converted to string to update to firebase", dTime);

var remObj = ITEMREF.child(fbAuth.uid).child("reminders");
        var remSet = $firebaseObject(remObj);

        remSet.Settings = {
        
        firstTime : false,
        alarmToggle : $scope.alarmToggle.value,
     editAlarmsIcon : $scope.editAlarmsIcon,
     showAlarms : $scope.showAlarms,
     breakfastTime : bTime,
     lunchTime : lTime,
     dinnerTime : dTime,
     repeat : $scope.repeatChoice.value,
     alarmBlood : $scope.alarmBlood.value,
     bloodLogNotify : $scope.bloodLogNotify

   };



 remSet.$save().then(function(remObj){
    console.log(remSet.$id);
    $scope.reminderModal.hide();
    $scope.getRem();
   }, function(error){
    console.log("ERROR: ",error);
   })
}//end of fbAuth

cordova.plugins.notification.local.schedule([{
    id: 1,
    at: _breakfastTime,
    text: "Time For Breakfast!",
    title: "DBcare+",
    led: "ADDFFF",
    icon: "file://img/icon.png"
  },{
    id: 2,
    at: _lunchTime,
    text: "Time For Lunch!",
    title: "DBcare+",
    led: "32CD32",
    icon: "file://img/icon.png"
  },{
    id: 3,
    at: _dinnerTime,
    text: "Time For Dinner!",
    title: "DBcare+",
    led: "FF8000",
    icon: "file://img/icon.png"
  }]).then (function(){
    console.log("the notification works");
    
  })//end of cordovaNotification

  



  

  
 
  



} 
 //end of if

//if repeat equals true add every parameter

if ($scope.repeatChoice.value == true)
  {
    console.log("Inside true condition");

    var fbAuth = $firebaseAuth(AUTHREF).$getAuth(); 
    console.log(fbAuth.uid);
    if(fbAuth)
    {
     bTime = $filter('date')(bTime, 'HH:mm');
     bTime = bTime.toString();
  
  console.log("Time converted to string to update to firebase", bTime);

  lTime = $filter('date')(lTime, 'HH:mm');
  lTime = lTime.toString();
  console.log("Time converted to string to update to firebase", lTime);
  
  dTime = $filter('date')(dTime, 'HH:mm');
  dTime =  dTime.toString();
  console.log("Time converted to string to update to firebase", dTime);

var remObj = ITEMREF.child(fbAuth.uid).child("reminders");
        var remSet = $firebaseObject(remObj);

        remSet.Settings = {
        
        firstTime : false,
        alarmToggle : $scope.alarmToggle.value,
     editAlarmsIcon : $scope.editAlarmsIcon,
     showAlarms : $scope.showAlarms,
     breakfastTime : bTime,
     lunchTime : lTime,
     dinnerTime : dTime,
     repeat : $scope.repeatChoice.value,
     alarmBlood : $scope.alarmBlood.value,
     bloodLogNotify : $scope.bloodLogNotify

   };



 remSet.$save().then(function(remObj){
    console.log(remSet.$id);
    $scope.reminderModal.hide();
    $scope.getRem();
    
   }, function(error){
    console.log("ERROR: ",error);
   })

     cordova.plugins.notification.local.schedule([{
    id: 1,
    at: _breakfastTime,
    every: "minute",
    text: "Time For Breakfast!",
    title: "DBcare+",
    led: "ADDFFF",
    icon: "file://img/icon.png"
  },{
    id: 2,
    at: _lunchTime,
    every: "minute",
    text: "Time For Lunch!",
    title: "DBcare+",
    led: "32CD32",
    icon: "file://img/icon.png"
  },{
    id: 3,
    at:  _dinnerTime,
    every: "minute",
    text: "Time For Dinner!",
    title: "DBcare+",
    led: "FF8000",
    icon: "file://img/icon.png"
  }]).then (function(){
    console.log("the notification works");
    
  })//end of cordovaNotification)

   
 
}//end of fbAuth

   


    



  







} //end of if







} // end of addNotification function
  
}])
