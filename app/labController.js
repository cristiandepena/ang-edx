app.controller('labController', [
    '$scope','$timeout', '$q', '$http','gitHub',
    function ($scope, $timeout, $q, $http, gitHub) {
        
        $scope.model= {
            number: 0,
            result: 'Ready',
        };

        $scope.checkOddNumber = checkOddNumber;

        $scope.getRepos = getRepos;
        $scope.loadDetail = loadDetail;

        function getRepos(organization) {
            $scope.model.repos = null;
            $scope.model.failStatus = null;

            $scope.model.repos = gitHub.getAll({ org: organization }).$promise.then(
                function(response) {
                   $scope.model.repos = response;
                }, function (reason) {
                   $scope.model.failStatus = true;
                   console.log($scope.model.failStatus);
                }
            );
        }

        function loadDetail(name) {
            $scope.model.detail = null;
            $scope.model.detail = gitHub.getDetail({ id: name });
        }

        function checkOddNumber(input) {
            $scope.model.result = 'Working...';
            checkOddNumberHandler(input).then(function(result) {
                $scope.model.result = 'Success: '+ result;
            },
            function(result) {
                $scope.model.result = 'Error: ' + result;
            })
        } //End of First function
        
        function checkOddNumberHandler(input) {
            var defer = $q.defer();

            $timeout(function() {
                if (isNumberOdd(input)){
                    defer.resolve('Yes, an odd number');
                }else {
                    defer.reject('Not an odd number');
                }
            }, 1000);

            return defer.promise;
        } //End of second function

        function isNumberOdd(input) {
            return !isNaN(input) && input % 2 == 1;
        }
    }
]);