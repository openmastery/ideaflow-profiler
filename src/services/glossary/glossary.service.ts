import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Definition } from '../../models/definition';

@Injectable()
export class GlossaryService {
  private apiUrl = 'http://om-ideaflow.herokuapp.com/';

  constructor(private http: Http ){

  }

  getDefinitions (): Observable<Definition[]> {
    let headers = new Headers({ 'X-API-Key': 'b4e02226-f96c-4ebc-8c2f-2d2c639948ef' });
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.apiUrl + 'storyweb/glossary', options)
    .map( response => <Definition[]>response.json().definitions );
  }

}
