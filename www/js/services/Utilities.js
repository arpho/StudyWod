angular.module('StudyWod.services', []).factory('Utility',function($window, $ionicLoading){
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

        return {
                    'show':show
                    ,'hide':hide
                    , 'notiofy':notify
                };

}
	
	);