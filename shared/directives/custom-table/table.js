var table = angular.module('tableModule',[]);

table.directive('customTable', function () {
    return{
        templateUrl:'shared/directives/custom-table/table.component.html',
        controller:customTableController,
        controllerAs:"vm",
        bindToController:true,
        restrict:'E',
        scope:{
            pagination:'=',
            source: '=',
            headers: '=',
            props: '=',
            type:'@',
            activator:'@',
            // paginator values - to transfer them to paginator component
            limit:'=',
            perPage:'=',
            borderButtons:'=',
            paginatorAction:'@'
        }
    }
});


table.directive('paginator', function () {
    return {
        templateUrl:'shared/directives/paginator/paginator.component.html',
        controller:paginatorController,
        controllerAs:"vm",
        bindToController:true,
        restrict: 'E',
        scope:{
            limit:'=',
            perPage:'=',
            borderButtons:'=',
            paginatorAction:'@'
        }
    }
});

function paginatorController($scope) {
    var self = this;
    self.toStart = toStart;
    self.toEnd = toEnd;
    self.paginate = paginate;
    self.pageNumber = 1;
    console.log(self.limit/self.perPage);

    function init() {
        if(self.limit > self.perPage){
            self.beginFrom = ((self.limit/self.perPage) * self.pageNumber) + 1;
            self.endTo = self.beginFrom + self.perPage + 1;
        }
        else{
            self.beginFrom = 1;
            self.endTo = self.limit;
        }

    }

    function paginate(direction) {

    }

    function toStart() {

    }

    function toEnd() {

    }

    init();
}


function customTableController($scope) {
    var self = this;

    self.actionCall = actionCall;

    function actionCall(data){
        var activatorLine = self.activator;
        $scope.$emit(activatorLine, data);
    }
}
