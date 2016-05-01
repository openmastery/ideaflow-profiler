import {Component} from 'angular2/core';
import {IfmDataService} from './ifmDataService';
import {Injectable} from 'angular2/src/core/di';

@Injectable()

@Component({
  selector: 'ifm-graph',
  template: '<div class="ifm-graph">graph</div>'
})
export class IfmGraph {
  constructor(myDS: IfmDataService) {
    console.log(myDS.returnTest());
  }
}
