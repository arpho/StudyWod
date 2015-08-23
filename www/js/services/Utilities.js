angular.module('StudyWod.services').factory('Utility',['$firebaseAuth'
,'$ionicPopup'
,'$window'
,'$ionicLoading'
,'$timeout'
,function($firebaseAuth,popup,$window, $ionicLoading, $timeout){
    console.log('popup')
    console.log($timeout)
	var show = function(text) {
            var loading = $ionicLoading.show({
                content: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            })}
			, /*
			Add days to DateTime
			@param current Date :: Date
			@param  days to be added :: int
			@return  added Date:: Date
			*/
			 addDays = function(date, days) {
				var result = new Date(date);
				result.setDate(result.getDate() + days);
				return result;
			}
			/*
			 formatta la data  nel formato locale
			 @param  oggetto Date:: Date
			 @param visualizzare giorno della settimana:: boolean default false
			 @return formatta la data secondo il formato locale:: String
			*/
			,formatDate  = function(d){
				/*var giorno = "";
				if (withDay){
					giorno = getDay(d) +" "
				}*/
				return   [d.getDate(), d.getMonth()+1, d.getFullYear()].join('/')
			}
			
			,previousState,
			setPreviousState = function(state){
				previousState = state
			}
			,getPreviousState = function(){
				return previousState
			}
            ,hide = function() {
                $ionicLoading.hide();
            }
            ,notify = function(text) {
        //show(text);
   /*     var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);*/
        var myPopup = popup.alert({title:text,okText:'Ok'})
		myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function(){
            myPopup.close()
	  },1500)
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
        var  baseUrl = 'https://studywod.firebaseio.com/';
                var auth = new Firebase(baseUrl);
                var getAuth = function(){
                    return auth
                }
		var  getActivitiesRef = function(){
			var ref  = new Firebase(baseUrl+"tasks")
			return ref
		}
		


        return {
                    'show':show
                    ,'hide':hide
                    ,'notify':notify
                    ,'getAuth':getAuth
					,'formatDate': formatDate
					,'addDays': addDays
					,'getActivitiesRef':getActivitiesRef
					,'getPreviousState':getPreviousState
					,'setPreviousState':setPreviousState
                };

}]
	
	);