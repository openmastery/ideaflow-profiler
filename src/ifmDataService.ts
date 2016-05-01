import 'rxjs/add/operator/map';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Injectable} from 'angular2/src/core/di';

@Injectable()
export class IfmDataService {

  constructor( myHttp: Http) {
    this._http = myHttp;
  }

  returnTest() {
    return this._http.get('test/data/v1/drgonzo/add_idle_event.json')
      .subscribe(
        res => this.persons = res.json(),
        error =>  console.log(error)
      );
      //.map( response => response.json() );
  }
}
