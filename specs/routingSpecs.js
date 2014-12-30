
describe('Routing', function () {
  var $route;
  beforeEach(module('App',['ui.router']));

  beforeEach(inject(function($injector){
    $route = $injector.get('$route');
  }));

  it('Should have / route, template, and controller', function () {
    expect($route.routes['/']).to.be.ok();
  });
});

  // it('Should have /signup route, template, and controller', function () {
  //   expect(2+4).to.be(6);
  // });


