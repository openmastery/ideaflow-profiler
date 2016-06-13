(function () {
'use strict';

angular.module('ifm-viz')
  .controller('ifmTaskController', ifmTaskController);

ifmTaskController.$inject = ['$scope', 'ifmHttp'];
function ifmTaskController($scope, ifmHttp) {
  ifmHttp.getTask('detail').then(function(resp) {
    $scope.taskDate = resp.data.creationDate;
    console.log( 'blerg', $scope.taskDate );
  });
}

})();
