angular.module('StudyWod.services').factory('Utility',['$firebaseAuth','$ionicPopup',function($firebaseAuth,popup,$window, $ionicLoading,$ionicPopup, $cordovaLocalNotification){
	var show = function(text) {
            var loading = $ionicLoading.show({
                content: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            })}
            ,hide = function() {
                $ionicLoading.hide();
            }
            ,notify = function(text) {
        //show(text);
   /*     var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);*/
        console.log('$ionicPopup');
        popup.alert({title:'autenticazione avvenuta con successo',okText:'Ok'})
       /* $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "This is a message",
            title: "This is a title",
            autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });*/
      // $window.setTimeout(function() {
      //   hide();
      // }, 1999);
    };
        var  baseUrl = 'https://studywod.firebaseio.com//';
                var auth = new Firebase(baseUrl);
                var getAuth = function(){
                    return auth
                }

        return {
                    'show':show
                    ,'hide':hide
                    , 'notify':notify
                    ,'getAuth':getAuth
                };

}]
	
	);