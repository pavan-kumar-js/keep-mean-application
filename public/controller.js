(function(){
    var userProp ={
        name : "",
        image: "",
        email:""
    };
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

loginSuccess = function(googleUserData){
    var profileData = googleUserData.getBasicProfile();
    var username = profileData.getName();
    var email = profileData.getEmail();
    var image = profileData.getImageUrl();
    userProp.name = username;
    userProp.email = email;
    userProp.image = image;
    $(".g-signin2").hide();
    window.location.href=decodeURIComponent(window.location.href+'home');
  };

logOut = function(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        alert("Successfully signed out");
        var currentScreen = window.location.href
        var index = currentScreen.indexOf('/home')
        var loginScreen = currentScreen.substr(0,index);
        window.location.href = loginScreen;
        $(".g-signin2").show();
    })
};

app.controller('loginController',function($scope,$location){
    $scope.myname = "";
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
    $scope.userProps = {
        "name": userProp.name,
        "image":userProp.image,
        "email" :userProp.email
    };
    $scope.records.push(rec1);
    $scope.records.push(rec2);
    $scope.y=["Menu 1","Menu 2"];
    $scope.menu = ["Pavan","Kumar"];
    $scope.cardClicked = function(record){
        //Card is clicked, Do something
        if(record.title == "Pavan"){
            logOut();
        }
    }
    });
})()



