var modal = angular.module('modals', []);

modal.directive('modalContainer', function () {
    return{
        templateUrl:'shared/directives/modals/modal-container.component.html',
        controller: modalContainerController,
        controllerAs:'vm',
        bindToController:true,
        scope:{
            modalTemplate:'@',
            isOpened:'=',
            infoData: '='
        },
    }
});


function modalContainerController($scope, $timeout) {
    var self = this;
    self.closeModal = closeModal;

    $scope.$on('closeModal', function () {
       closeModal();
    });

    function closeModal() {
        self.isOpened = false;
        self.modalTemplate = '';
        $timeout(function () {
            angular.element(document.querySelectorAll('modal-container')).remove();
        },500);
    }
}

modal.controller('createEventController', function($scope, $http) {
    var self = this;
    self.info = $scope.$parent.$parent.$parent.vm.infoData;
    self.isSubmitted = true;
    self.closeModal = closeModal;
    self.submit = submit;
    self.form = {
        category: 0,
        amount: 0,
        description: '',
        type: '',
    };

     function submit() {
        self.isSubmitted = true;
        if(self.form.$valid){
            var sendForm = {
                category: +self.form.category,
                date: new Date(),
                amount: self.form.amount,
                description: self.form.description,
                type: self.form.type
            };
            $http.post('http://localhost:3000/events', sendForm).then(function () {
                self.closeModal();
            });
        }

    }


    function closeModal() {
        $scope.$emit('closeModal', true) ;
    }
});

modal.controller('createCategoryController', function ($scope, $http) {
    var self = this;
    self.closeModal = closeModal;
    self.submitForm = submitForm;
    self.form = {
        name:'',
        capacity:0
    };

    function submitForm() {
        if(self.form.$valid){
            var saveForm = {
                name: self.form.name,
                capacity: self.form.capacity
            };

            $http.post('http://localhost:3000/categories', saveForm).then(function () {
                self.closeModal();
            });
        }
    }

    function closeModal() {
        $scope.$emit('closeModal', true) ;
    }
});