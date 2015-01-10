(function(){

  var app = angular.module('App', ['ui.router', 'controllers']);

  app.config(function($stateProvider, $urlRouterProvider) {
   
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partial-home.html'
      })
      .state('app', {
        url: '/app',
        templateUrl: 'partial-app.html'
      });
      $urlRouterProvider.otherwise('/');
  });
  
})();