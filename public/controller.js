(function(){
    var userProp ={
        name : "123",
        image: "",
        email:"123",
        login:"email"
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
        var currentScreen = window.location.href
        var index = currentScreen.indexOf('/home')
        var loginScreen = currentScreen.substr(0,index);
        window.location.href = loginScreen;
        $(".g-signin2").show();
    })
};

app.controller('loginController',function($scope,$http,$location){
    $scope.myname = "";
    $scope.username=  "";   
    $scope.password = "";
    $scope.createAccount = "./createAccountView";
    $scope.forgotPassword = "https://www.bing.com";
    $scope.authorizeUserCredentials= function(){
        var username = $scope.username;
        var password = $scope.password;

        $http({
            method: 'GET',
            url: '/verifyUser',
            params:{"username":username,"password":password}
         }).then(function (success){
             if(success.data.length == 1){
                 userProp.name = success.data[0].username;
                 userProp.email = success.data[0].email;
                 userProp.image = "http://www.squawka.com/news/wp-content/uploads/2017/05/Zlatan-Ibrahimovic-1.jpg?resolution=940,1"
;                userProp.login = "email";
                 $location.path('/home');
             }
             else{
                alert("Incorrect credentials");
             }
         },function (error){
            console.log(error);
         });
    }
});
app.controller('homeController',function($scope,$http,$location,$scope, $timeout, $mdSidenav, $mdComponentRegistry, $log,$mdDialog){
    
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
    $http({
        method: 'GET',
        url: '/getNotes'
     }).then(function (success){
         $scope.records = success.data;
        console.log(success.data);
     },function (error){
        console.log(error);
     });
    $scope.userProps = {
        "name": userProp.name,
        "image":userProp.image,
        "email" :userProp.email
    };

    $scope.y=["Menu 1","Menu 2"];
    $scope.menu = ["Pavan","Kumar"];
    $scope.cardClicked = function(record){
        if(record.title == "Note 1"){
            logOut();
        }
    }
    $scope.scopeLogout = function(ev){
        $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Logged out')
              .textContent('You have been successfully logged out')
              .ariaLabel('Alert Dialog Demo')
              .ok('Ok')
              .targetEvent(ev)
          );
        logOut();
        
    }

    $scope.addNote = function(ev) {
        $mdDialog.show({
          controller: dialogController,
          templateUrl: 'addNote.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function() {
        }, function() {
        });
      };

      dialogController = function($scope, $mdDialog) {
        $scope.noteTitle="";
        $scope.noteBody = "";
        $scope.cancel = function() {
          $mdDialog.cancel();
        };  
        $scope.createNote = function() {
            $scope.cancel();
            //write note creation login here
        };
      }
    });
})()



