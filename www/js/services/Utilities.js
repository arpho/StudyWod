angular.module('StudyWod.services').factory('Utility',['$firebaseAuth','$ionicPopup',function($firebaseAuth,popup,$window, $ionicLoading,$ionicPopup, $cordovaLocalNotification){
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
			,/*ritorna il giorno della settimana
			@param oggetto Date:: Date
			@return il giorno della settimana :: string
			@todo implementare internazionalizzazione*/
			getDay = function(d){
				switch(d.getDay()){
					case 0:
						return "domenica";
					case 1:
						return "lunedì";
					case 2:
						return "martedì"
					case 3:
						return "mercoledì";
					case 4:
						return "giovedì"
					case 5:
						return "venerdì"
					case 6:
						return "sabato"
				}
			}
			/*
			 formatta la data  nel formato locale
			 @param  oggetto Date:: Date
			 @param visualizzare giorno della settimana:: boolean default false
			 @return formatta la data secondo il formato locale:: String
			*/
			,formatDate  = function(d,withDay){
				var giorno = "";
				if (withDay){
					giorno = getDay(d) +" "
				}
				return  giorno + d.toLocaleDateString()
			}
            ,hide = function() {
                $ionicLoading.hide();
            }
            ,notify = function(text) {
        //show(text);
   /*     var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);*/
        popup.alert({title:text,okText:'Ok'})
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
                    , 'notify':notify
                    ,'getAuth':getAuth
					,'formatDate': formatDate
					,'addDays': addDays
					,'getActivitiesRef':getActivitiesRef
                };

}]
	
	);