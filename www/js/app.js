var tab ={
  name:'tab',
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  }
  ,auth={
    name: 'auth'
    ,abstract:true
    ,url:"/auth"
    ,templateUrl: "templates/auth.html"
  }
  ,workout={
    name: 'workout'
    ,abstract:true
    ,url:"/workout"
    ,templateUrl: "templates/workout.html"
  }
  ,chats={
    name :'chats',
    parent:'tab',
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    },signin=  { name:'signin'
            ,parent:'auth'
            ,url: '/signin'
            ,views: {
                'auth-signin': {
                    templateUrl: 'templates/auth-signin.html'
                    ,controller: 'SignInController'
                }
            }
        }
    ,signup=  { name:'signup'
            ,parent:'auth'
            ,url: '/signup'
            ,views: {
                'auth-signup': {
                    templateUrl: 'templates/auth-signup.html'
                    ,controller: 'SignUpController'
                }
            }
        }
    ,wod=  { name:'wod'
            ,parent:'workout'
            ,url: '/wod'
            ,views: {
                'wod': {
                    templateUrl: 'templates/wod.html'
                    ,controller: 'WodController'
                }
            }
        }
    ,wot=  { name:'wot'
            ,parent:'workout'
            ,url: '/wot'
            ,views: {
                'wot': {
                    templateUrl: 'templates/wod.html'
                    ,controller: 'WotController'
                }
            }
        }
    ,detail= {
      name:'detail'
      ,parent:'chats'
      ,url: '/chats/:chatId'
      ,views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html'
          ,controller: 'ChatDetailCtrl'
        }
      }
    }
    , dash= {
              name:'tab.dash'
              ,url:'/dash'
              , views:{
                  'tab-dash':{
                                    templateUrl:'templates/tab-dash.html'
                                    ,controller:'DashCtrl'
                  }
                } 
            }
    
   // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('StudyWod', ['ionic', 'StudyWod.controllers', 'StudyWod.services', 'firebase', "ngCordova"])

.run(function($ionicPlatform, $firebaseAuth, $firebase) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state(tab)
    .state(auth)
    .state(signup)
    .state(signin)
	.state(workout)
	.state(wod)
	.state(wot)

  // Each tab has its own nav history stack:

  .state(dash)
  .state(chats)
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  }).state('tab.menu', {
    url: '/menu',
    views: {
      'tab-menu': {
        templateUrl: 'templates/tab-menu.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/signin');
//  $urlRouterProvider.otherwise('/tab/chats');

});
