angular.module('StudyWod.services').factory('Utility',['$firebaseAuth',function($firebaseAuth,$window, $ionicLoading){
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
        show(text);
      $window.setTimeout(function() {
        hide();
      }, 1999);
    };
        var  baseUrl = 'https://studywod.firebaseio.com//';
                var auth = new Firebase(baseUrl);

        return {
                    'show':show
                    ,'hide':hide
                    , 'notify':notify
                    ,'auth':auth
                };

}]
	
	);