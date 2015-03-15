angular.module('StudyWod.services', []).factory('Utility',function($window, $ionicLoading){
	var show = function(text) {
            $rootScope.loading = $ionicLoading.show({
                content: text ? text : 'Loading..',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            })},
            hide = function() {
            $ionicLoading.hide();
        };
        return {'show':show,'hide':hide};

        };
	
	});