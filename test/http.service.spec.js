(function () {
'use strict';

describe( 'test', function () {
  var mockHttp, mockScope, mockBackend, mockQ,
    requests = this.requests = [],
    fakeXhr = sinon.useFakeXMLHttpRequest();

  beforeEach( module('ifm-viz') );
  beforeEach(function () { 
    inject(function( _ifmHttp_, $rootScope, $httpBackend, $q ) {
      mockHttp = _ifmHttp_;
      mockScope = $rootScope.$new();
      mockBackend = $httpBackend;
      mockQ = $q;
      mockBackend.expect( 'GET', 'http://localhost:8080/task?taskName=detail' )
        .respond({
          'id': 2,
          'creationDate': '2016-01-01T04: 42: 22',
          'name': 'detail',
          'description': 'Detailed conflict map'
        });
    });
  });
  afterEach(function () {
    fakeXhr.restore();
  });

  it( 'gets details', function () {
    var callback = sinon.spy(); 
    mockHttp.getTask( 'detail' ).then( callback );
    mockBackend.flush();

    expect( callback.calledWith(
      sinon.match({
        'data': {
          'name': 'detail'
        }
      }) 
    ));
  });
});

})();
