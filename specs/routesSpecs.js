describe('Routing', function () {

  var $rootScope, $state, $injector, state = 'home';

  beforeEach(module('App'));

  beforeEach(function() {

    inject(function(_$rootScope_, _$state_, _$injector_, $templateCache) {
      $rootScope = _$rootScope_;
      $state = _$state_;
      $injector = _$injector_;
      $templateCache.put('partial-home.html', '');
    })
  });

  it('should respond to URL', function() {
    expect($state.href(state)).to.be('#/');
  });

});
