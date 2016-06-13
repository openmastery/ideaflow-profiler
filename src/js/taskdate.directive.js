(function () {
'use strict';

angular.module('ifm-viz')
  .directive('ifmTaskDate', ifmTaskDate);
 
function ifmTaskDate() {
  return {
    restrict: 'A',
    replace: false,
    template: '{{ taskDate | date : \'MMMM dd yyyy, h:mm a\' }}'
  }
}

})();
