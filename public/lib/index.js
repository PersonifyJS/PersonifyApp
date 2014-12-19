var app = angular.module('App', ['ui.router']);
//example Hendrixer <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Scott Moss
app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html'
    })
    .state('student', {
      url: '/student',
      templateUrl: 'partial-student.html'
    })
    .state('mentor', {
      url: '/mentor',
      templateUrl: 'partial_mentor.html'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'partial-signin.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partial-signup.html'
    });

    $urlRouterProvider.otherwise('/');
});


app.factory('students', [
function(){
  var all = {
    students: [],
    mentors: [{name:'Dougs', reputation: 5}, {name:'Marcus', reputation: 1000}, {name:'Shawn', reputation: -10}]
  };
  return all;
}]);

app.controller('GitHubCtrl', ['$scope', '$http', 'students', function ($scope, $http, students) {

  $scope.students = students.students;

  $scope.incrementUpvotes = function(student) {
    student.upvotes += 1;
  };

  $scope.getGitInfo = function () {
    if(!$scope.username || $scope.username === '') { return; }
    $scope.userNotFound = false;
    $scope.loaded = false;
    $http.get("https://api.github.com/users/" + $scope.username)
     .success(function (data) {
        if (data.name === "") data.name = data.login;
        data.upvotes = 0;
        $scope.students.push(data);
        $scope.loaded = true;
     })
     .error(function () {
        $scope.userNotFound = true;
     });
    $scope.username = '';
  };

  var init = function(){
    $scope.username = 'therobinkim';
    $scope.getGitInfo();

    $scope.username = 'brettdewoody';
    $scope.getGitInfo();

    $scope.username = 'elderbas';
    $scope.getGitInfo();

    $scope.username = 'davemun';
    $scope.getGitInfo();

    $scope.username = 'drabinowitz';
    $scope.getGitInfo();

    $scope.username = 'Cheerazar' ;
    $scope.getGitInfo();

    $scope.username = 'jDeppen';
    $scope.getGitInfo();

    $scope.username = 'JulieMarie';
    $scope.getGitInfo();

    $scope.username = 'linglau5000';
    $scope.getGitInfo();

    $scope.username = 'nicmitchell';
    $scope.getGitInfo();

    $scope.username = 'plauer';
    $scope.getGitInfo();

    $scope.username = 'mcpike';
    $scope.getGitInfo();

    $scope.username = 'rohanagrawal';
    $scope.getGitInfo();

    $scope.username = 'roryc89';
    $scope.getGitInfo();

    $scope.username = 'sjstebbins';
    $scope.getGitInfo();

    $scope.username = '';
  };

  init();
}]);

    // $http.get("https://api.github.com/users/" + $scope.username + "/repos").success(function (data) {
    //   $scope.repos = data;
    //   $scope.reposFound = data.length > 0;
    // });

//dummy data for now. To be exctracted from db later
  var student1 = {
    name: "Essam",
    subject: "Angular"
  };
  var student2 = {
    name: "Victor",
    subject: "D3"
  };
  var student3 = {
    name: "Mike",
    subject: "Backbone"
  };

  var students = [student1, student2, student3];


app.controller('MentorCtrl',['$scope', '$http', 'students', function ($scope, $http, students) {

  $scope.mentors = students.mentors;

  $scope.requestMentorship = function () {
    // $scope.studentOnWaitingList = "Essam Al Joubori";
    $scope.studentOnWaitingList = "Victor Leung";
  };


  // var mentor1 = {
  //   name: "Scott Moss",
  //   reputation: 10
  // };
  // var mentor2 ={
  //   name: "Mike",
  //   reputation: 5
  // };
  // var mentor3 ={
  //   name: "Dave",
  //   reputation: 8
  // };

  //$scope.mentors = [mentor1, mentor2, mentor3];

  $scope.createNewMentor = function(){
   console.log("saved!");
   $scope.mentors.push({name: $scope.user.name, reputation: $scope.counter});
   console.log($scope.mentors);
  };
  // console.log($scope.mentors, mentor1, mentor2, mentor3);

  // $scope.showAllMentors = function() {
  //     $http.get('/mentor')
  //       .success(function(data){
  //         for (var i = 0; i < data.length; i++) {
  //         mentors.push((data[i].name));
  //       }

  //     });
  // };

  // $scope.mentors = mentors;

  // $scope.showAllMentors();



  var mentorName;
  $scope.getGitInfo = function () {
    createMentor = function(data) {
      console.log('createMentor', data);
      $http.post('/mentor', data)
        .success(function(res){
          console.log('res after posting into db', JSON.stringify(res) );
        });
    };
    var mentors = [];
    $scope.showMentors = function() {
      $http.get('/mentor')
        .success(function(data){
          for (var i = 0; i < data.length; i++) {
          mentors.push((data[i].name));
          console.log(mentors);
        }
      });
    };

    $scope.mentors = mentors;

    $scope.userNotFound = false;
    $scope.loaded = false;
    $http.get("https://api.github.com/users/" + $scope.username)
     .success(function (data) {
        if ($scope.username !== undefined) {
          $('#studentsTable').show();
          $('#totalReputation').show();
          createMentor(data);
        }

        if (data.name === "") data.name = data.login;
        $scope.user = data;
        console.log(data);
        $scope.loaded = true;
     })
     .error(function () {
        $scope.userNotFound = true;
     });
    $http.get("https://api.github.com/users/" + $scope.username + "/repos").success(function (data) {
      $scope.repos = data;
      $scope.reposFound = data.length > 0;
    });
    var counter = 0;
    $scope.reputation = counter;
    $scope.up = function() {
      counter++;
      //$('#reputation').html(counter);
      $scope.counter = counter;
    };
    $scope.down = function() {
      if (counter >= 1) {
        counter--;
        $scope.counter = counter;
      }
    };
  };

}]);

