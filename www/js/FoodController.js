
var dbcare = angular.module('dbcare');

dbcare.controller('FoodCtrl',['$scope','$ionicModal','$ionicPopover','FoodChart', function ($scope,$ionicModal,$ionicPopover,FoodChart) {
	
	var cartList=[];
	$scope.Items=0;
	$scope.totalKHE=0;
	/**
	 * Returns the food categories from foodChart.json
	 */
	FoodChart.then(function (msg) 
	{
			$scope.foodCategory=msg.data.category;
			for(x in msg.data.category)
			{
				console.log(x);
			}
			
    });
	
	/**
	 * gets foods according to the specified category and populates the foodModal.html
	 */
	$scope.populateFood=function(foodCat)
	{
		$scope.foodModalTitle=foodCat;
	  $scope.modal.show();
	  FoodChart.then(function (msg) 
      {
			$scope.foodSubCategory=msg.data.category[foodCat];
			console.log(msg.data.category[foodCat]);
	  });
	  console.log(foodCat);
	}
	/**
	 * 
	 */
	$scope.addToCart=function()
	{
		cartList.push({
			Name:$scope.name,
			Quantity:$scope.quantity,
			Portion:$scope.portion,
			KHE:$scope.khe,
			KCal:$scope.kcal
		});
	    console.log(this.name);
		$scope.Items=cartList.length;
		$scope.popover.hide();
		window.plugins.toast.showWithOptions({
		    message: "Added item to cart",
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
		  })
	}
	$scope.populateFoodCart=function()
	{	
		$scope.totalKHE=0;
		$scope.foodCart.show();
		for(x in cartList)
		{
			$scope.totalKHE+=Number(cartList[x].KHE);
		}
		$scope.cartElements=cartList;
	}
	$scope.removeFood=function(index){
		cartList.splice(index,1);
		$scope.populateFoodCart();
		$scope.Items--;
		
	}
	$scope.addFood=function(index)
	{
		console.log(index);
		cartList.push(index);
		$scope.populateFoodCart();
		$scope.Items++;
	}
  $ionicModal.fromTemplateUrl('views/modals/foodmodal.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	    
	  });
  $ionicModal.fromTemplateUrl('views/modals/foodCart.html', {
	    scope: $scope
	  }).then(function(foodCart) {
	    $scope.foodCart = foodCart;
	    
	  });
  $ionicPopover.fromTemplateUrl('views/modals/foodpop.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });
 
   $scope.openPopover = function($event,name,quantity,portion,khe,kcal) {
    $scope.popover.show($event);
    $scope.name=name;
    $scope.quantity=quantity;
    $scope.portion=portion;
    $scope.khe=khe;
    $scope.kcal=kcal
    
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
   };
  
 }]);