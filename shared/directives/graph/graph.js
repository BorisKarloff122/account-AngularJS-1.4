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


function graphController($scope, $timeout) {
    var self = this;
    var arr = self.data;
    var labels = [];
    var values = [];
    setTimeout(()=>{
        init();
    },1500);
        
    
    function setGraph() {
        var ctx = document.getElementById('myChart').getContext('2d');

        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels:labels,
                datasets: [{
                    label: '',
                    data: values,
                }],
            },
            options: {
                responsive: true
            }
        });
    }

    function init() {
        arr.forEach(function (i, item) {
            labels.push[i];
            values.push[i];
        });
        console.log(labels);
        setGraph();
    }


}


