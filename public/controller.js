(function(){
    var app = angular.module('firstApp',['ngRoute','ngMaterial']);
app.config([ '$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl : 'login.html',
        controller : 'sampleController'
    })
    $routeProvider.when('/createAccountView', {
        templateUrl : 'createAccountView.html',
        controller : 'createAccount'
    }).otherwise({
        redirectTo : 'index.html'
    });
    //$locationProvider.html5Mode(true); //Remove the '#' from URL.
}
]);

app.controller('sampleController',function($scope,$location){
    $scope.myname = "Pavan";
    $scope.username=  "";   
    $scope.password = "";
    $scope.createAccount = "./createAccountView";
    $scope.forgotPassword = "https://www.bing.com";

    $scope.authorizeUserCredentials= function(){
        var username = $scope.username;
        var password = $scope.password;
        $location.path("/createAccountView");
        // alert(username+"---"+password);
        // Hash the password and validate it with password in the backend
    }
});
app.controller('createAccount',function($scope,$location){
    
    });
    
})()

