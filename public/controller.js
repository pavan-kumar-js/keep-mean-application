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
app.controller('homeController',function($scope,$location,$scope, $timeout, $mdSidenav, $mdComponentRegistry, $log){
    
    $mdComponentRegistry
    .when('left')
    .then( function(sideNav){

      $scope.isOpen = angular.bind( sideNav, sideNav.isOpen );
      $scope.toggle = angular.bind( sideNav, sideNav.toggle );

    });
  $scope.toggleRight = function() {
    $mdSidenav('left').toggle()
                        .then(function(){
                          $log.debug("toggle left menu is done");
                        });
  };


    $scope.records=[];
    var rec1 = {
        "title":"Pavan",
        "sub":"Kumar"
    };
    var rec2 = {
        "title":"Abhishek",
        "sub":"Singh"
    };
    $scope.records.push(rec1);
    $scope.records.push(rec2);
    $scope.y=["Menu 1","Menu 2"];
    $scope.menu = ["Pavan","Kumar"];
    $scope.cardClicked = function(record){
        //Card is clicked, Do something
        alert("Card is clicked -- "+JSON.stringify(record));
    }
    });
})()

