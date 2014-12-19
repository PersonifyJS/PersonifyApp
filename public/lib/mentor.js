// var app = angular.module('App', ['ui.router']);




// // $(function(){
// //   // Hendrixer --->>>Scott Moss
// //   var mentor = {};

// //   mentor.init = function(){
// //     this.mentors = [];
// //     this.reputation = 6;
// //   }

// //   mentor.fetchMentor = function(username){
// //     $.ajax({
// //       url: 'https://api.github.com/users/' + username,
// //       type: 'GET',
// //       contentType: 'application/json',
// //       success: function(data){
// //         console.log("SUCCESS")
// //         mentor.mentors.push(data);
// //         console.log(mentor)
// //         mentor.addMentor(mentor.mentors);
// //       },
// //       error: function(data){
// //         console.error('something went wrong');
// //       },
// //     });
// //   };

// //   mentor.addMentor = function(data){
// //   var mentor = data[0];

// //   var name = '<h1>'+mentor.name+'</h1>';
// //   var email = '<a href=mailto:'+mentor.email+'>'+mentor.email+'</a>';
// //   var blog = '<p>'+mentor.blog+'</p>';
// //   var location = '<p>'+mentor.location+'</p>';
// //   var url = '<a href='+ mentor.url +'>'+mentor.url+'</p>';

// //   var followers = '<p> <strong>Followers: </strong> '+mentor.followers+'</p>';
// //   var following = '<p> <strong>Following: </strong>'+mentor.following+'</p>';
// //   var publicRepos = '<p> <strong> Repos: </strong>'+mentor.public_repos+'</p>';

// //   var image = '<img class="mentor-img" src=' + mentor.avatar_url +'>';

// //   $('#mentorImage').append(image);
// //   $('#mentorInfo').append(name + email + blog + location + url);
// //   $('#mentorMetrics').append(followers + following + publicRepos);
// //   $('#totalReputation').show();
// //   $('table').show();
// //   $('#studentsTable').show();
  
// // };


// //   //dummy data
// //   var student1 = {
// //     name: "Essam",
// //     subject: "Angular"
// //   };
// //   var student2 = {
// //     name: "Victor",
// //     subject: "D3"
// //   };
// //   var student3 = {
// //     name: "Vissam",
// //     subject: "Backbone"
// //   };

// //   var students = [student1, student2, student3];
// //   var showStudentsClicked = false;
// //   $('#showStudents').on('click', function(e){
// //     if (!showStudentsClicked) {
// //       e.preventDefault();
// //       for (var key in students) {
// //         console.log(students[key].name);
// //         $('table').find('tbody').append('<tr>').append('<td>'+students[key].name+'</td>')
// //         $('table').find('tbody').append('<td>'+students[key].subject+'</td>')
// //         showStudentsClicked = true;
// //       }
// //     }
    
// //   });
// //   var reputationCount = [];
// //   var clickedUp = false;
// //   var counter = 0
// //   $('#up').on('click', function(e){
// //     if (!clickedUp) {
// //       e.preventDefault();
// //       clickedUp = true;
// //       reputationCount.push('whohoo');
// //       counter++;
// //       $('#reputation').html(counter);
// //     }
// //   });
// //    var clickedDown = false;
// //    $('#down').on('click', function(e){
// //     if (!clickedDown) {
// //       e.preventDefault();
// //       clickedDown = true;
// //       if (counter--) {
// //         reputationCount.pop('whohoo');
// //         $('#reputation').html(counter);
// //       }
// //     }  
// //   });


// //   $('.search').on('click', function(e){
// //     e.preventDefault();
// //     var $mentorName = $('#mentorName').val();
// //     mentor.fetchMentor($mentorName);
// //   });

// //   mentor.init();

// // });