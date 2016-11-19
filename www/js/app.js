// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dbcare', ['ionic','starter.controllers','firebase','ngCordovaOauth','ngCordova','chart.js'])

.value("AUTHREF", new Firebase("https://diabetescareplus.firebaseio.com/"))
.value("ITEMREF", new Firebase("https://diabetescareplus.firebaseio.com/dbcare") )
/**
 * connection for social logins (Facebook, google etc.)
 */
.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https://diabetescareplus.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})
/**
 * factory: FoodChart to access foodChart.json
 */
.factory("FoodChart", function ($http) 
{
	var url="";
	if(ionic.Platform.isAndroid())
	{
		url = "/android_asset/www";
	}
	console.log(url);
            return $http.get('foodChart.json');
})

.config(function ($stateProvider, $urlRouterProvider) {
$stateProvider

.state('session', {
url: '/session',
templateUrl: 'views/session.html',
controller: 'LoginCtrl',
cache: false
})

.state('login', {
url: '/login',
templateUrl: 'views/login.html',
controller: 'LoginCtrl',
cache: false
})

.state('signup', {
url: '/signup',
templateUrl: 'views/signup.html',
controller: 'SignUpCtrl',
cache: false
})

.state('tour', {
url: '/tour',
templateUrl: 'views/tour.html',
controller: 'TourCtrl',
cache: false
})

.state('tour1', {
url: '/tour1',
templateUrl: 'views/tour-1.html',
controller: 'TourCtrl',
cache: false
})

.state('tour2', {
url: '/tour2',
templateUrl: 'views/tour-2.html',
controller: 'TourCtrl',
cache: false
})

.state('menu', {
    url: '/home',
    templateUrl: 'views/menu.html',
    abstract:true,
    controller: 'MenuCtrl',
    
  })

 .state('bloodSugarDemoTabs', {
    url: "/bloodtabs",
    abstract:true,
    templateUrl: "views/bloodSugarDemoTabs.html"
  })

 .state('reminderDemoTabs', {
    url: "/remindertabs",
    abstract:true,
    templateUrl: "views/reminderDemoTabs.html"
  })

 .state('fandbDemoTabs', {
    url: "/foodtabs",
    abstract: true,
        templateUrl: "views/fandbDemoTabs.html"
  })

  .state('graphDemoTabs', {
    url: "/graphtabs",
    abstract: true,
        templateUrl: "views/graphDemoTabs.html"
  })


 .state('bloodSugarDemoTabs.addTab', {
      url: '/tab1',
      views: {
        'addBloodSugarDemo': {
          templateUrl: 'views/demos/addBloodSugarDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

 .state('bloodSugarDemoTabs.editTab', {
      url: '/tab2',
      views: {
        'editBloodSugarDemo': {
          templateUrl: 'views/demos/editBloodSugarDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

  .state('bloodSugarDemoTabs.deleteTab', {
      url: '/tab3',
      views: {
        'deleteBloodSugarDemo': {
          templateUrl: 'views/demos/deleteBloodSugarDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

  .state('reminderDemoTabs.configureTab', {
      url: '/tab4',
      views: {
        'configureRemindersDemo': {
          templateUrl: 'views/demos/configureRemindersDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

 .state('reminderDemoTabs.repeatTab', {
      url: '/tab5',
      views: {
        'repeatRemindersDemo': {
          templateUrl: 'views/demos/repeatRemindersDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

  .state('reminderDemoTabs.offTab', {
      url: '/tab6',
      views: {
        'reminderOffDemo': {
          templateUrl: 'views/demos/reminderOffDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

   .state('fandbDemoTabs.foodTab', {
      url: '/tab7',
      views: {
        'fandbDemo': {
          templateUrl: 'views/demos/fandbDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

  .state('graphDemoTabs.graphTab', {
      url: '/tab8',
      views: {
        'graphDemo': {
          templateUrl: 'views/demos/graphDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

  .state('graphDemoTabs.pdfTab', {
      url: '/tab9',
      views: {
        'pdfDemo': {
          templateUrl: 'views/demos/pdfDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })

  .state('graphDemoTabs.emailTab', {
      url: '/tab10',
      views: {
        'emailDemo': {
          templateUrl: 'views/demos/emailDemo.html',
          //controller: 'tab1Ctrl'
        }
      }
    })




.state('menu.home', {
    url: '/home',
    views: {
      'sidemenu': {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        

      }
    }
  })

.state('menu.foodchart', {
    url: '/foodchart',
    views: {
      'sidemenu': {
        templateUrl: 'views/foodchart.html',
        controller: 'FoodCtrl',
        
      }
    }
  })

.state('menu.bloodsugar', {
url: '/bloodsugar',
views: {
      'sidemenu': {
templateUrl: 'views/bloodsugar.html',
controller: 'BloodSugarCtrl',
}
}
})

.state('menu.reminders', {
url: '/reminders',
views: {
  'sidemenu': {

templateUrl: 'views/reminders.html',
controller: 'ReminderCtrl',
}
}
})

.state('menu.graphreport', {
url: '/graphreport',
views: {
  'sidemenu':{
templateUrl: 'views/graphreport.html',
controller: 'GraphCtrl',
}
}
})

.state('menu.profile', {
url: '/profile',
views:{
  'sidemenu' : {
templateUrl: 'views/profile.html',
controller: 'ProfileCtrl',
}
}
})

.state('menu.demos', {
url: '/demos',
views:{
  'sidemenu' : {
templateUrl: 'views/demos.html',
}
}
})

.state('menu.settings', {
url: '/settings',
views:{
  'sidemenu' : {
templateUrl: 'views/settings.html',
}
}
})

.state('menu.about', {
url: '/about',
views:{
  'sidemenu' : {
templateUrl: 'views/about.html',
controller: 'AboutCtrl'
}
}
})

.state('menu.faq', {
url: '/faq',
views:{
  'sidemenu' : {
templateUrl: 'views/faq.html',
controller: 'FaqCtrl'

}
}
})

/*.state('menu.consult', {
url: '/consult',
views:{
  'sidemenu' : {
templateUrl: 'views/consult.html',
cache: false
}
}
})*/





$urlRouterProvider.otherwise('/session');
})








.run(function($ionicPlatform, $state, $location, $ionicHistory, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }



$ionicPlatform.registerBackButtonAction(function() {
//var path = $location.path()
  if ($location.path() === "/home/home" || $location.path() === "/login") {

  var confirmPopup = $ionicPopup.confirm({
     title: "<b>Exit DBcare+</b>",
     template: "<b>Are you sure you want to exit?</b>",
     okText: 'Exit',
     okType: 'button-assertive',
     cancelType: 'button-positive'

   });

   confirmPopup.then(function(res) {
     if(res) {
       ionic.Platform.exitApp();
     } /*else {
       $state.go('/home')
     }*/
   });

  }
  else {
    $ionicHistory.goBack();
  }

}, 100);


  });




  });
