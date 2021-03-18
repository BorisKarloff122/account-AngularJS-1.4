var graph = angular.module('graph', []);

graph.directive('pieChart', function () {
   return{
       templateUrl:'shared/directives/graph/graph.component.html',
       controller:graphController,
       controllerAs:'vm',
       bindToController:true,
       scope:{
           data:'=',
       }
   }
});


function graphController($scope) {
    var self = this;
    $scope.$on('graphDataChange',function (event,data) {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data
        });
    });

}


