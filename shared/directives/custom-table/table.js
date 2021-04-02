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
            // paginator values - transfer them to paginator component
            limit:'=',
            perPage:'=',
            borderButtons:'=',
            paginatorAction:'=',
            onPage: '='
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
            paginatorAction:'=',
            onPage:'='
        }
    }
});

function paginatorController($scope, $timeout) {
    var self = this;
    self.toStart = toStart;
    self.toEnd = toEnd;
    self.paginate = paginate;
    self.changeOnPageValue = changeOnPageValue;
    self.pageNumber = 1;
    self.limitToBegin = false;
    self.limitToEnd = false;
    self.endPage = 0;


    function init() {
        self.beginFrom = 1;
        self.endTo = self.beginFrom + self.perPage - 1;
        self.endPage = Math.ceil(self.limit/self.perPage);
        self.limitToBegin = self.perPage > self.limit;
        self.limitToEnd = self.perPage > self.limit;
    }

    function changeOnPageValue() {
        $scope.$emit(self.paginatorAction, {page: 1, perPage: self.perPage});
        init();
    }

    function paginate(direction) {
        if(direction === 'next'){
            if(self.limitToEnd){return;}
            self.limitToEnd = self.pageNumber === self.endPage - 1;
            self.limitToBegin = false;
            self.pageNumber = self.pageNumber + 1;
            self.beginFrom = self.beginFrom + self.perPage;
            if(self.beginFrom + self.perPage < self.limit){
                self.endTo = self.beginFrom + self.perPage - 1;
            }
            else{
                self.endTo = self.limit;
            }
        }
        else{
            if(self.limitToBegin){return;}
            self.limitToBegin = self.pageNumber === 2;
            self.limitToEnd = false;
            self.pageNumber = self.pageNumber - 1;
            self.beginFrom = self.beginFrom - self.perPage;
            self.endTo = self.beginFrom + self.perPage - 1;
        }
        $scope.$emit(self.paginatorAction, {page: self.pageNumber, perPage: self.onPage});
    }

    function toStart() {
        self.limitToBegin = true;
        self.limitToEnd = false;
        self.pageNumber = 1;
        self.beginFrom = self.pageNumber;
        self.endTo = self.beginFrom + self.perPage - 1;
        $scope.$emit(self.paginatorAction, {page: self.pageNumber, perPage: self.perPage});
    }

    function toEnd() {
        self.pageNumber = self.endPage;
        self.limitToBegin = false;
        self.limitToEnd = true;
        self.endTo = self.limit;
        var lastPageElements = self.limit - (self.perPage * (self.endPage - 1)) - 1;
        self.beginFrom = self.limit - lastPageElements;
        $scope.$emit(self.paginatorAction, {page: self.pageNumber, perPage: self.onPage});
    }

    $timeout(function () {init();},100);
}

function customTableController($scope) {
    var self = this;
    self.pagAction = self.paginatorAction;
    self.actionCall = actionCall;
    self.setIndex = setIndex;
    self.indexAccum = 1;

    function setIndex(index) {
        if(!self.pagination){return index;}
        else{return index;}
    }

    function actionCall(data){
        var activatorLine = self.activator;
        $scope.$emit(activatorLine, data);
    }
}
