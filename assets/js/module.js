var app = angular.module('appModule',[
    'auth',
    'main',
    'ngRoute',
    'ngMaterial'
]);

angular.module('appModule').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {template:'<list-block></list-block>',})
            .when('/account', {template:'<account-list></account-list>',});
}]);

angular.module('appModule').directive('appHeader', function () {
   return{
       templateUrl:'shared/components/header.component.html',
       controller:headerController,
       controllerAs:'headerCtrl',
       bindToController:true
   } 
});

angular.module('appModule').directive('appFooter', function () {
    return{
        templateUrl:'shared/components/footer.component.html',
        controller:footerController,
        controllerAs:'footerCtrl',
        bindToController:true
    }
});

function footerController() {
    
}

function headerController() {
    
}
