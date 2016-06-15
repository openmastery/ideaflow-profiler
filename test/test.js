describe('test', function () {
  var mockHttp;
  
  beforeEach( module('ifm-viz') );
  beforeEach( 
    inject(function(_ifmHttp_) {
      mockHttp = _ifmHttp_;
    })
  );

  it( 'has a service', function () {
    expect(mockHttp);
  });
});
