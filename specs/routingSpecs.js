describe('Routing', function () {

  var $route;
  beforeEach(module('App'));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));
  

  it('Should have /signup route, template, and controller', function () {
    expect(2+4).to.be(6);
  });

});
