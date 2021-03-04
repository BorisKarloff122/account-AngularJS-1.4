var auth = angular.module('auth', ['ngRoute']);

auth.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/login', {template:'<login></login>',})
            .when('/reg', {template:'<register></register>',});
}]);

auth.directive('login', function () {
    return{
        templateUrl:'pages/auth/components/login.component.html',
        controller:loginController,
        controllerAs:'loginCtrl',
        bindToController:true
    }
});

auth.directive('register', function () {
    return{
        templateUrl:'pages/auth/components/reg.component.html',
        controller:registerController,
        controllerAs:'regCtrl',
        bindToController:true
    }
});


function loginController($scope, $http, $location) {
    var loginCtrl = this;
    loginCtrl.hidePass = true;
    loginCtrl.isSubmitted = false;
    loginCtrl.passwordCheck = false;
    loginCtrl.loginError = '';
    loginCtrl.loginForm = {
        email: '',
        password: ''
    };

    loginCtrl.submitForm = submitForm;

    function submitForm() {
        loginCtrl.isSubmitted = true;

        if ($scope.loginForm.$valid){
            $http.get(`http://localhost:3000/users?email=${loginCtrl.loginForm.email}`).then(loginSuccess,);
        }
    }

    function loginSuccess(response) {
        console.log('dis');
        if (response.data.length === 0){
            loginCtrl.loginError = 'Такого пользователя не существует';
            setTimeout(function () {loginCtrl.loginError = ''}, 600);
        }
        else {
            if(response.data[0].password === loginCtrl.loginForm.password){
                loginCtrl.passwordCheck = true;
            }
            else if(response.data[0].password !== loginCtrl.loginForm.password){
                loginCtrl.loginError = 'Пароль не верный!';
                setTimeout(function () {loginCtrl.loginError = ''}, 600);
                return
            }
        }
        if(response.data.length > 0 && loginCtrl.passwordCheck){
            $http.post('http://localhost:3000/activeUser', response.data);
            $location.url('/account');
        }
    }
}


function registerController($scope, $location, $http) {
    var regCtrl = this;

    regCtrl.hidePass = true;
    regCtrl.isSubmitted = false;
    regCtrl.submitForm = submitForm;
    regCtrl.regForm = {
        email:'',
        password:'',
        name:'',
        agree:false
    };

    function submitForm () {
        regCtrl.isSubmitted = true;
        if($scope.regForm.$valid){
            delete regCtrl.regForm.agree;
            $http.post('http://localhost:3000/users', regCtrl.regForm).then(regSuccess);
        }
    }

    function regSuccess() {
        $location.url('/login');
        regCtrl.isSubmitted = false;
    }
}
