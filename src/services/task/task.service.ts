import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Task } from '../../models/task';


@Injectable()
export class TaskService {
  private apiUrl = 'http://om-ideaflow.herokuapp.com/';
  constructor(private http: Http ){

  }
  getTasks (): Observable<Task[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + 'ideaflow/task', options)
    .map( response => <Task[]>response.json().contents );
  }
}
