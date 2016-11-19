var dbcare = angular.module('dbcare');

dbcare.controller('HomeCtrl',['$scope','$firebaseAuth','$firebaseObject','AUTHREF','ITEMREF', function ($scope, $firebaseAuth, $firebaseObject, AUTHREF, ITEMREF) {

$scope.getName = function(){

    var fbAuth = $firebaseAuth(AUTHREF).$getAuth();
    
    if(fbAuth){
   
        var ref = ITEMREF.child(fbAuth.uid).child("profile");
          var obj = $firebaseObject(ref);
            obj.$loaded().then(function(x){
              x === obj;
              $scope.prof = obj;
              console.log("Success; ", $scope.prof.name);
            }).catch(function(error){
              console.log("Error: ",error);
            })
    }
  }


 
 }]);