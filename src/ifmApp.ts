
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

import {IfmGraph} from './ifmGraph';
import {IfmTimeline} from './ifmTimeline';
import {IfmDataService} from './ifmDataService';

@Component({
  selector: 'ifm-app',
  template: '<ifm-graph></ifm-graph><ifm-timeline></ifm-timeline>',
  directives: [IfmGraph, IfmTimeline]
})
export class IfmApp {

}

bootstrap(IfmApp, [IfmDataService, HTTP_PROVIDERS])
  .catch(err => console.error(err));
