var account = angular.module('account',[]);

account.directive('accountPage', function () {
   return {
        templateUrl:'pages/main/account-page/account-page.component.html',
        controller:accountController,
        controllerAs: 'vm',
        bindToController:true
   }
});


function accountController() {
    
}
