(function () {
'use strict';

angular.module('ifm-viz')
  .factory('ifmHttp', ifmHttpService);

ifmHttpService.$inject = ['$http', 'ifmConfig'];

function ifmHttpService($http, ifmConfig) {
  var iHS = {
    getTask: getTask
  };
  return iHS;

  function getTask( taskName ) {
    return $http.get( ifmConfig.host + '/task?taskName=' + taskName )
      .then( getComplete )
      .catch( getFailed );
    
    function getComplete( resp ) {
      return resp;
    }

    function getFailed( error ) {
      // TODO: replace with proper logger
      console.log( error.data );
    }
  }
}

})();
