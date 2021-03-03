var auth = angular.module('auth', ['ngRoute']);


angular.module('auth').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/login', {template:'<login></login>',})
            .when('/reg', {template:'<register></register>',});
    }]);





angular.module('auth').directive('login', function () {
    return{
        templateUrl:'pages/auth/components/login.component.html',
        controller:loginController,
        controllerAs:'loginCtrl',
        bindToController:true
    }
});




angular.module('auth').directive('register', function () {
    return{
        templateUrl:'pages/auth/components/reg.component.html',
        controller:registerController,
        controllerAs:'regCtrl',
        bindToController:true
    }
});


function loginController($scope, dataGetter) {
    var loginCtrl = this;

    loginCtrl.hidePass = true;
    loginCtrl.isSubmitted = false;
    loginCtrl.loginForm = {
        emailUser: '',
        userpassword: ''
    };

     loginCtrl.submitForm = function submitForm() {
        loginCtrl.isSubmitted = true;
        if ($scope.loginForm.$valid){

        }
    }
}


function registerController(dataGetter, $http) {
    var regCtrl = this;
    regCtrl.hidePass = true;
    regCtrl.isSubmitted = false;
    regCtrl.regForm = {
        emailUser:'',
        userpassword:'',
        name:'',
        agree:false
    };

    regCtrl.submitForm = function () {
        console.log(regCtrl.regForm);

        if(regCtrl.regForm.$valid){
                $http.post('http://localhost:3000/users', regCtrl.regForm).then(alert('true'), alert('false'));
        }
    }


}
