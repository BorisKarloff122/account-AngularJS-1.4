var account = angular.module('account',[]);

account.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/account', {redirectTo:'/bill'})
            .when('/bill', {template:'<bill-page></bill-page>',})
            .when('/history', {template:'<history-page></history-page>',})
            .when('/records', {template:'<records-page></records-page>',});
    }]);


account.directive('accountPage', function () {
   return {
        templateUrl:'pages/main/account-page/account-page.component.html',
        controller:accountController,
        controllerAs: 'vm',
        bindToController:true
   }
});



account.directive('billPage', function () {
    return {
        templateUrl:'pages/main/bill/bill-page.component.html',
        controller:accountController,
        controllerAs: 'vm',
        bindToController:true
    }
});

function accountController() {
    
}
