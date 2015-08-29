angular.module('StudyWod.services').factory('Utility',['$firebaseAuth'
,'$ionicPopup'
,'$window'
,'$ionicLoading'
,'$timeout'
,function($firebaseAuth,popup,$window, $ionicLoading, $timeout){
	/* memorizza un valore in locale
	@param String chiave
	@param String valore
	*/
	var setValue = function(key,value){
		$window.localStorage[key] = value
	}
	/*
	recupera un valore salvato in locale
	@param String chiave delvalore
	@param String valore di default
	@return String il valore memorizzato
	*/
	, getValue = function(key,defaultValue){
		return $window.localStorage[key] ||defaultValue
	}
	,show = function(text) {
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
        var myPopup = popup.alert({title:text,okText:'Ok'})
		myPopup.then(function(res) {
    console.log('Tapped!', res);
  });
  $timeout(function(){
            myPopup.close()
	  },1500)
    }
	/*apre un popup di conferma
	@param string titolo del popup
	@param string messaggio del popup
	@param function funzione per conferma
	@param function funzione annulla*/
	, confirmPopup = function(titolo,msg,confirmFunction,cancelFunction){
		confirmPopup =popup.confirm({title:titolo,template:msg})
		confirmPopup.then(function(res){
			if( res) confirmFunction()
				else cancelFunction()
		})
	}
	/* aggiunge i parametri di un oggetto ad un'altro
	@param Object oggetto destinazione cui saranno aggiunti i parametri
	@param Object oggetto che sarà aggiunto al primo
	@return Object il primo oggetto cui sono stati aggiunti quelli del primo*/
	,addObj = function(dst,src){
		for (var key in src){
			dst[key]= src[key]
		}
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
					,'setValue':setValue
					,'getValue':getValue
					,'addObj':addObj
					,'confirmPopup':confirmPopup
                };

}]
	
	);