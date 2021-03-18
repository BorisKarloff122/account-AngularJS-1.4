var table = angular.module('tableModule',[]);

table.directive('customTable', function () {
    return{
        templateUrl:'shared/directives/custom-table/table.component.html',
        controller:customTableController,
        controllerAs:"vm",
        bindToController:true,
        restrict:'E',
        scope:{
            source: '=',
            headers: '=',
            props: '=',
            type:'@',
            activator:'@'
        }
    }

});


function customTableController($scope) {
    var self = this;
    self.actionCall = actionCall;

    function actionCall(data){
        var activatorLine = self.activator;
        $scope.$emit(activatorLine, data);
    }
}
