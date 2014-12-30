"use strict";

describe('MapCtrl', function () {
  var $scope, $rootScope, createController, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('App'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MapCtrl', {
        $scope: $scope
      });
    };
  }));

  it('Should set up the controller correctly', function() {
    createController();
    expect($scope.search).to.be.an('object');
    expect($scope.search.val).to.be.a('function');
  });

  it('Should call the d3 function when the controller is loaded', function(){
    createController();
    $httpBackend.expectGET('/states.json').respond(data);
    expect(data).to.be.an('object');

  });
  
});
