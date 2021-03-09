var table = angular.module('tableModule',[]);

table.directive('customTable', function () {

    return{
        templateUrl:'shared/directives/table.component.html',
        controller:customTableController,
        controllerAs:"vm",
        bindToController:true,
        restrict:'E',
        scope:{
            source: '=',
            headers: '=',
            props: '=',
            type:'@'
        }
    }

});


function customTableController($scope) {
    var self = this;

}
