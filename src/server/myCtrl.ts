var app = angular.module("myApp", []);
app.controller("myCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.alerts= [{}] ;

    const getAlerts = () => $http({method: 'GET', url: 'http://localhost:3000/alerts'}).then(
        function successCallback(response) {
            console.log(response)
            $scope.alerts = $scope.alerts.concat(response.data)
            getAlerts();
        },
        function errorCallback(response) {
            console.log(response);
            getAlerts();
        }
    )
    getAlerts();
    }]);
