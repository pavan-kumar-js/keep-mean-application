(function(){
    var app = angular.module('safe',['ngRoute','ngMaterial']);
app.config([ '$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl : 'login.html',
        controller : 'loginController'
    })
    $routeProvider.when('/home', {
        templateUrl : 'home.html',
        controller : 'homeController'
    }).otherwise({
        redirectTo : 'index.html'
    });
    //$locationProvider.html5Mode(true); //Remove the '#' from URL.
}
]);

app.controller('loginController',function($scope,$location){
    $scope.myname = "Pavan";
    $scope.username=  "";   
    $scope.password = "";
    $scope.createAccount = "./createAccountView";
    $scope.forgotPassword = "https://www.bing.com";

    $scope.authorizeUserCredentials= function(){
        var username = $scope.username;
        var password = $scope.password;
        if(username == "admin" && password =="admin"){
            $location.path("/home");
        }
        else{
            alert("Enter correct credentials");
        }
        //$location.path("/createAccountView");
        // alert(username+"---"+password);
        // Hash the password and validate it with password in the backend
    }
});
app.controller('homeController',function($scope,$location){
    
    });
    
})()

