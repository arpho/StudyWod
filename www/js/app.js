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
                    ,controller: 'SignInCtrl'
                }
            }
        }
    ,signup=  { name:'signup'
            ,parent:'auth'
            ,url: '/signup'
            ,views: {
                'auth-signup': {
                    templateUrl: 'templates/auth-signup.html'
                    ,controller: 'SignUpCtrl'
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
angular.module('Studywod', ['ionic', 'Studywod.controllers', 'Studywod.services'])

.run(function($ionicPlatform) {
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
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/chats');

});