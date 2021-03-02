var auth = angular.module('auth', ['ngRoute']);


angular.module('auth').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/login', {template:'<list-block></list-block>',})
            .when('/registration', {template:'<account-list></account-list>',});
    }]);


angular.module('auth').directive('login', function () {
    return{
        templateUrl:'auth/components/login.component.html',
        controller:loginController,
        controllerAs:'loginCtrl',
        bindToController:true
    }
});


function loginController($scope) {
    
}
