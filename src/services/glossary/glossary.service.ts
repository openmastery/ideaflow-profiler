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
    let headers = new Headers({ 'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8' });
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.apiUrl + 'storyweb/glossary', options)
    .map( response => <Definition[]>response.json().definitions );
  }


  getTaskDefinitions (taskId): Observable<Definition[]> {
    let headers = new Headers({ 'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8' });
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.apiUrl + 'storyweb/glossary/task/'+taskId, options)
      .map( response => <Definition[]>response.json().definitions );
  }

  updateTerm(definition: Definition) {
    let headers = new Headers({'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8', 'Content-Type': 'application/json'});
    var myOptions = new RequestOptions({headers: headers});

    let url = this.apiUrl + 'storyweb/glossary/term/id/'+definition.id;

    return this.http
      .put(url, definition, myOptions)
      .map(res => res.json());
  }


  getAllDefinitions (): Observable<Definition[]> {
    let headers = new Headers({ 'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8' });
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.apiUrl + 'storyweb/glossary', options)
      .map( response => <Definition[]>response.json().definitions );
  }


}
