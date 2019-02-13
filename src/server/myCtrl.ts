var app = angular.module("myApp", []);
app.controller("myCtrl", ['$scope', '$http', function($scope, $http) {
    $scope.alerts= [{}] ;
    const getAlerts = () => $http({method: 'GET', url: 'http://localhost:3000/alerts'}).then(
        function successCallback(response: { data: any; }) {
            console.log(response)
            $scope.alerts = $scope.alerts.concat(response.data)
            getAlerts();
        },
        function errorCallback(response: any) {
            console.log(response);
            getAlerts();
        }
    )
    getAlerts();
    }]);
