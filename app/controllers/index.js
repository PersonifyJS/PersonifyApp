(function(){

  var app = angular.module('App', ['ui.router', 'controllers']);

  app.config(function($stateProvider, $urlRouterProvider) {
   
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partial-home.html'
      });
      $urlRouterProvider.otherwise('/');
  });
  
})();