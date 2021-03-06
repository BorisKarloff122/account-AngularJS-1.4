var table = angular.module('tableModule',['ngSanitize']);

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
            } else {
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

        $scope.$emit(self.paginatorAction, {page: self.pageNumber, perPage: self.perPage});
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
        $scope.$emit(self.paginatorAction, {page: self.pageNumber, perPage: self.perPage});
    }

    $timeout(function () {init();},100);
}

function customTableController($scope, $timeout, $filter) {
    var self = this;
    self.pagAction = self.paginatorAction;
    self.actionCall = actionCall;
    self.setIndex = setIndex;
    self.sortCols = sortCols;
    self.indexAccum = 1;
    self.sourceReady = false;

    function init() {
        self.source.forEach(function (item, index) {
            self.props.forEach(function (innerItem, innerIndex) {
                if (typeof self.source[index][innerItem] === "object" && item !== null){
                    var itemValue = self.source[index][innerItem];

                    if(itemValue.type === 'image'){
                        self.source[index][innerItem] = '<span class = "material-icons">' + itemValue.value + '</span>';
                    }

                    else if(itemValue.type === 'image_unknown'){
                        self.source[index][innerItem] = "<img class = 'small_img' src=" + itemValue.value.source + "/>";
                    }
                }
            });
        });
        self.sourceReady = true;
    }

    function setIndex(index) {
        if(!self.pagination){return index;}
        else{return index;}
    }
    
    function sortCols (colName) {
        let colIndex = self.headers.indexOf(colName);
        self.source.sort((a, b) => a.Object.keys(self.source)[colIndex] > b.Object.keys(self.source)[colIndex] ? 1 : -1);
    }

    function actionCall(data){
        var activatorLine = self.activator;
        $scope.$emit(activatorLine, data);
    }

    $timeout(function (){init()}, 550);
}


