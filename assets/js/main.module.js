var account = angular.module('account',[
    'ngMessages',
    'ngMaterial',
    'ngAnimate']);

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
        controller:billController,
        controllerAs: 'vm',
        bindToController:true
    }
});

account.directive('historyPage', function () {
    return {
        templateUrl:'pages/main/history/history-page.component.html',
        controller:historyController,
        controllerAs: 'vm',
        bindToController:true
    }
});

function accountController($http, $scope) {
   var self = this;
   self.setState = setState;
   self.tempState = 'pages/main/bill/bill-page.component.html';


   $scope.$on('drawerOpen',function (event, data) {
      self.drawer = data
   });
   
   function init(){
        $http.get('http://localhost:3000/activeUser').then(function (response) {
            self.user = response.data[0];
        });
       setState();
   }

   function setState(state) {
       if(state === 'bill') {
            self.tempState = 'pages/main/bill/bill-page.component.html';
       }
       else if(state === 'history'){
           self.tempState = 'pages/main/history/history-page.component.html';
       }
       else if(state === 'records'){
           self.tempState = 'pages/main/records/records-page.component.html';
       }
   }

   init();
}

function billController() {
   var self = this;
}

function historyController() {
    var self = this;
}


account.controller('drawerController', function ($scope, $location, $http) {
    var self = this;
    self.drawerActive = drawerActive;
    self.openMenu = openMenu;
    self.logOut = logOut;
    self.isDrawed = false;

    function drawerActive() {
        if(self.isDrawed){
            self.isDrawed = false;
            $scope.$emit('drawerOpen', self.isDrawed);
        }
        else{
            self.isDrawed = true;
            $scope.$emit('drawerOpen', self.isDrawed);
        }
    }

    function openMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    function closeMenu($mdMenu, ev) {
        $mdMenu.close(ev);
    }
    
    function logOut() {
        $http.delete('http://localhost:3000/activeUser/3').then(function () {
            $location.url('login');
        });
    }
});


account.filter('imgFilter',function () {
    return function (text) {
        var random = rand();
        return text + random + '.jpg';
    };

    function rand() {
        return Math.floor(Math.random() * (Math.floor(4) - Math.ceil(1) + 1)) + Math.ceil(1);
    }
});
