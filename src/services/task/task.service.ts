import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Task } from '../../models/task';
import { TaskFullDetail } from '../../models/taskFullDetail';


@Injectable()
export class TaskService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: Http ){

  }

  getTasks (project): Observable<Task[]> {
    let projectParam = (project) ? project:'';
    let headers = new Headers({ 'X-API-Key': 'b4e02226-f96c-4ebc-8c2f-2d2c639948ef' });
    let options = new RequestOptions({headers: headers});
    let params = (projectParam) ? '?project='+projectParam:'';

    return this.http
      .get(this.apiUrl + 'ideaflow/task' + params, options)
      .map( response => <Task[]>response.json().contents );
  }

  getTaskFullDetail (taskId): Observable<TaskFullDetail> {
    let projectParam = (taskId) ? taskId:'';
    let headers = new Headers({ 'X-API-Key': 'b4e02226-f96c-4ebc-8c2f-2d2c639948ef' });
    let options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + 'ideaflow/timeline/task/' + taskId + '/full', options)
      .map( response => <TaskFullDetail>response.json());
  }

}
