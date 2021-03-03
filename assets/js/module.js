var app = angular.module('appModule',[
    'auth',
    'main',
    'ngRoute',
    'ngMessages',
    'ngMaterial',
    'ngAnimate'
]);

angular.module('appModule').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {redirectTo:'/login'})
            .when('/account', {template:'<account-list></account-list>',})
            .otherwise('/404', {template: '<not-found></not-found>'});
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


angular.module('appModule').directive('notFound', function () {
    return{
        templateUrl:'shared/components/not-found.component.html',
        controller:notController,
        controllerAs:'notCtrl',
        bindToController:true
    }
});



function footerController() {
    
}

function headerController() {
    
}

function notController() {
    
}
