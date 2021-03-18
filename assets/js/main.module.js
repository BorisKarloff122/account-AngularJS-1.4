var account = angular.module('account',[
    'ngMessages',
    'ngMaterial',
    'ngAnimate']);


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
   self.tempState = 'pages/main/bill/bill-page.component.html';
   self.drawer = true;
   self.menuState = 'bill';
   self.setState = setState;
   
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
            self.menuState = 'bill';
       }
       else if(state === 'history'){
           self.tempState = 'pages/main/history/history-page.component.html';
           self.menuState = 'history';
       }
       else if(state === 'records'){
           self.tempState = 'pages/main/records/records-page.component.html';
           self.menuState = 'records';
       }
   }

   init();
}


account.controller('billController', function billController($http,$scope) {
    var self = this;
    self.valutes = ['EUR', 'USD', 'UAH'];

    $http.get('http://data.fixer.io/api/latest?access_key=156f43c852d2eb2cdca7a4ba965e720a').then(function (responseMain) {
        self.currencyRateUSD = responseMain.data['USD'];
        self.currencyRateUAH = responseMain.data['UAH'];
        $http.get('http://localhost:3000/bill').then(function (response) {
            setDataSource(responseMain, response);
        })
    });

    function setDataSource (response, bill){
        self.billDataSource = Array(3).fill(0).map(function (x, index) {
         return  {
                name: self.valutes[index],
                value:response.data.rates[self.valutes[index]],
                date: response.data['date']
            }
        });
        self.billProps = ['name','value', 'date'];
        self.recordedProps = ['name','value'];
        self.recordedSource = Array(3).fill(0).map(function (x, y) {
            return{
                name:self.valutes[y],
                value: bill.data.value * response.data.rates[self.valutes[y]]
            }
        })
    }

    $scope.$on('historyTable', function () {
        alert('stuff');
    });
});

account.controller('historyController', function ($scope, $http, $filter) {
    var self = this;
    self.categoryNames = [];
    self.outcomes = [];
    self.graphData = {};
    self.tableHeaders = [];
    self.tableSource = [];
    self.tableSource = [];
    $http.get('http://localhost:3000/categories').then(function (categories) {
        $http.get('http://localhost:3000/events').then(function (events) {
            categories.data.forEach(function (i, item) {
                self.categoryNames.push(i.name);
            });
            events.data.forEach(function (i, item) {
                self.outcomes[i.category] = typeof self.outcomes[i.category] !== 'undefined'
                    ? self.outcomes[i.category] + i.amount
                    : i.amount;

                self.tableSource.push({
                    type:$filter('typeFilter')(i.type),
                    category: self.categoryNames[i.category],
                    amount:i.amount,
                    date:i.date,
                    action:{
                        data: i.id,
                        buttonText:'Подробнее'
                    }
                    })
            });
            calcGraphData();
            calcTableSource();
        });
    });

    function calcGraphData() {
        let labels = [];
        let values = [];
        self.outcomes.forEach(function (i, item) {
            if(i){
                labels.push(self.categoryNames[item]);
                values.push(i);
            }
        });
        self.graphData = {
            labels:labels,
                datasets: [{
                label: 'OutcomesGraph',
                data: values,
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)']
            }],
        };
        $scope.$broadcast('graphDataChange', self.graphData);
    }
    function calcTableSource() {
        self.tableHeaders = ['#', 'Сумма', 'Дата', 'Категория', 'Тип', 'Действие'];
        self.tableProps = ['index','amount','date','category','type','action'];
    }

});

account.controller('drawerController', function ($scope, $location, $http) {
    var self = this;
    self.isDrawed = true;
    self.drawerActive = drawerActive;
    self.openMenu = openMenu;
    self.logOut = logOut;

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
    
    function logOut() {
        $http.get('http://localhost:3000/activeUser').then(function (response) {
            $http.delete('http://localhost:3000/activeUser/' + response.data[0].id).then(function () {
                $location.url('login');
            });
        });
    }
});

account.filter('typeFilter',function () {
   return function (text) {
       if(text === 'outcome'){
           return 'Расход'
       }
       else{
           return 'Доход'
       }
   };
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
