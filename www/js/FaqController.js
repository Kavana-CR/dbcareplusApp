var dbcare = angular.module('dbcare');

dbcare.controller('FaqCtrl',['$scope', function ($scope) {


      $scope.group1= {show: false};
      $scope.group2= {show: false};
      $scope.group3= {show: false};
      $scope.group4= {show: false};
      $scope.group5= {show: false};
      $scope.group6= {show: false};
      $scope.group7= {show: false};
      $scope.group8= {show: false};
      
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup1 = function(group1) {
    group1.show = !group1.show;
  };
  $scope.isGroupShown1 = function(group1) {
    return group1.show;
  };

$scope.toggleGroup2 = function(group2) {
    group2.show = !group2.show;
  };
  $scope.isGroupShown2 = function(group2) {
    return group2.show;
  };

  $scope.toggleGroup3 = function(group3) {
    group3.show = !group3.show;
  };
  $scope.isGroupShown3 = function(group3) {
    return group3.show;
  };

  $scope.toggleGroup4 = function(group4) {
    group4.show = !group4.show;
  };
  $scope.isGroupShown4 = function(group4) {
    return group4.show;
  };

  $scope.toggleGroup5 = function(group5) {
    group5.show = !group5.show;
  };
  $scope.isGroupShown5 = function(group5) {
    return group5.show;
  };

  $scope.toggleGroup6 = function(group6) {
    group6.show = !group6.show;
  };
  $scope.isGroupShown6 = function(group6) {
    return group6.show;
  };

  $scope.toggleGroup7 = function(group7) {
    group7.show = !group7.show;
  };
  $scope.isGroupShown7 = function(group7) {
    return group7.show;
  };

  $scope.toggleGroup8 = function(group8) {
    group8.show = !group8.show;
  };
  $scope.isGroupShown8 = function(group8) {
    return group8.show;
  };


}]);

 