import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {IfmGraph} from './ifmgraph';
import {IfmTimeline} from './ifmtimeline';

@Component({
  selector: 'ifm-app',
  template: '<ifm-graph></ifm-graph><ifm-timeline></ifm-timeline>',
  directives: [IfmGraph, IfmTimeline]
})
export class IfmApp {

}

bootstrap(IfmApp);
