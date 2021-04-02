angular.module('appModule').value('details',{
   id:0,
   categoryNames:[]
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
