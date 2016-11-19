
var dbcare = angular.module('dbcare');

dbcare.controller('BloodSugarCtrl',['$scope','$ionicModal', '$filter', '$firebaseArray','$firebaseAuth','$cordovaToast', '$ionicPopup', 'ITEMREF','AUTHREF', function ($scope,$ionicModal,$filter,$firebaseArray,$firebaseAuth,$cordovaToast,$ionicPopup,ITEMREF,AUTHREF)
{
 
  
    $ionicModal.fromTemplateUrl('views/modals/bloodmodal.html', {
    scope: $scope
  }).then(function(bloodsugar) {
    $scope.bloodsugar = bloodsugar;
  });

  $ionicModal.fromTemplateUrl('views/modals/editbloodmodal.html', {
    scope: $scope
  }).then(function(editbloodsugar) {
    $scope.editbloodsugar = editbloodsugar;
  });

  $scope.retrieveBlood = function(){

    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
    if(fbAuth){

      var ref = ITEMREF.child(fbAuth.uid).child("bloodsugar");
      var list = $firebaseArray(ref);

      list.$loaded().then(function(x){
        x === list;
        $scope.blood = list;
        if($scope.blood.length == 0) 
        {
          $scope.display = false;
          $scope.starter = true;
        }
        else{
          $scope.display = true;
          $scope.starter = false; 
        }
        
        if($scope.blood.length != 0) 
   {
       window.plugins.toast.showWithOptions({
    message: "Load Successful: Blood Sugar Logs",
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
  })}//end of toast message

      }).catch(function(error){
     window.plugins.toast.showWithOptions({
    message: "Error : Unable to retrieve Blood Sugar Logs from database",
    duration: "long", // 5000 ms
    position: "center",
    styling: {
      opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      backgroundColor: '#242f24', // make sure you use #RRGGBB. Default #333333
      textColor: '#FFFFFF', // Ditto. Default #FFFFFF
      textSize: 20, // Default is approx. 13.
      cornerRadius: 30 // minimum is 0 (square). iOS default 20, Android default 100
      //horizontalPadding: 15, // iOS default 16, Android default 50
      //verticalPadding: 10 // iOS default 12, Android default 30
    }
  })//end of toast message

      });
    }//end of if(fbAuth)

  }//end of list function

  $scope.newBlood = function()
  {
    $scope.bloodsugar.show();
    
    $scope.nblood =
    {
      value:null,
      inputdate: new Date(),
      inputtime: new Date(),
      notes: null
    };

    var bTime = new Date();
  bTime = $filter('date')(bTime, 'MMM d, y HH:mm');
  $scope.nblood.inputtime = new Date(bTime);
    
  }

  $scope.pushBlood = function(_nblood){

    console.log(_nblood.inputtime);
    var d = $filter('date')(_nblood.inputdate, 'MMM d, y');
    var fd = d.toString();//filtered date to string type

    var t =$filter('date')(_nblood.inputtime, 'HH:mm');
    var ft = t.toString();//filtered time to string type

    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
    var ref = ITEMREF.child(fbAuth.uid).child("bloodsugar");

    if(fbAuth){

      var blood = $firebaseArray(ref);
      blood.$add({
        value : _nblood.value,
        date : fd,
        time : ft,
        notes : _nblood.notes
      }).then(function(ref){
        var id = ref.key();
        $scope.bloodsugar.hide();
        $scope.retrieveBlood();
      window.plugins.toast.showWithOptions({
    message: "Successfully Added Blood Sugar",
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
        $scope.bloodsugar.hide();
      window.plugins.toast.showWithOptions({
    message: "Error: Unable to add blood sugar",
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
        
      });

    }//end of if(fbAuth)



  }//end of pushBlood function

  $scope.editblood=function(_b,_id){
  
  var d = _b.date;
  console.log(d);
  var fd = new Date(d);
  console.log(fd);  

    $scope.eblood={
      value: _b.value,
      date: fd,
      time: null,
      notes: _b.notes,
      id : _id
    };
    var bTime = fd;
    console.log(bTime);
  bTime = $filter('date')(bTime, 'MMM d, y');
  bTime = bTime +' '+_b.time;
  $scope.eblood.time = new Date(bTime);
    $scope.editbloodsugar.show();
    //console.log(d);
    console.log(bTime);

    
    
  }// End of Edit blood funtion


  $scope.updateBlood=function(_eblood){

    var d = $filter('date')(_eblood.date,'MMM d, y');
    var fd = d.toString();
    var t =$filter('date')(_eblood.time, 'HH:mm');
    var ft = t.toString();//filtered time to string type


      
    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
    if(fbAuth)
    {
      var ref=ITEMREF.child(fbAuth.uid).child("bloodsugar");
      console.log(ref);
      var obj=$firebaseArray(ref);
      obj.$loaded().then(function(x)
    {
      x === obj;
      var i = obj.$indexFor(_eblood.id);
      console.log("the index is : ",i);
      obj[i].value = _eblood.value;
      obj[i].date = fd;
      obj[i].time = ft;
      obj[i].notes = _eblood.notes;
      obj.$save(i).then(function(ref){
        ref.key() === obj.$id;
        $scope.editbloodsugar.hide();
      window.plugins.toast.showWithOptions({
    message: "Update Successful",
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
        $scope.editbloodsugar.hide();
       window.plugins.toast.showWithOptions({
    message: "Error: Unable to update Blood Sugar",
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

      });//End of $save then function
    })//End of $loaded then function
    }//End of fbAuth

  }//End of updateBlood funtion

$scope.deleteBlood=function(_id) {
var confirmPopup = $ionicPopup.confirm({
  title: 'Delete Blood Sugar Record?',
  template : 'Are you sure you want to delete?',
  cancelType : 'button-positive',
  okType : 'button-assertive'
});

var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
if(fbAuth)
{
  var ref = ITEMREF.child(fbAuth.uid).child("bloodsugar");
  var obj = $firebaseArray(ref);

  obj.$loaded().then(function(x){
    x === obj;
    var i = obj.$indexFor(_id);
    var item = obj[i];

    // A confirm dialogue box

    confirmPopup.then(function(res) {

    if(res) {
  obj.$remove(item).then(function(ref){
    ref.key()===item.$id;
    $scope.retrieveBlood();
    $scope.editbloodsugar.hide();

    window.plugins.toast.showWithOptions({
    message: "Sucessfully Deleted Blood Sugar Log",
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

  
  }, function(error){
    console.log(error);
  })//end of $remove function

}else{
  $scope.editbloodsugar.hide();
}

});//end of then for confirm popup

})//End of then for $loaded
  .catch(function(error){
    $scope.editbloodsugar.hide();
    console.log(error);
    window.plugins.toast.showWithOptions({
    message: "Unable to delete blood sugar",
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
  });
  
}//End of fbAuth if
}//End of deleteblood function

}]);

