import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Task } from '../../models/task';
import { TaskFullDetail } from '../../models/taskFullDetail';


@Injectable()
export class TaskService {
  private apiUrl = 'http://ideaflowdx.openmastery.org';

  constructor(private http: Http ){

  }

  updateEvent(eventPath, jsonPatch) {
    let headers = new Headers({'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8', 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    let url = this.apiUrl + "/ideaflow" + eventPath;

    return this.http
      .put(url, jsonPatch, options)
      .map(res => res.json());
  }

  getTasks (project): Observable<Task[]> {
    let projectParam = (project) ? project:'';
    let headers = new Headers({ 'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8' });
    let options = new RequestOptions({headers: headers});
    let params = (projectParam) ? '?project='+projectParam:'';

    return this.http
      .get(this.apiUrl + '/ideaflow/task' + params, options)
      .map( response => <Task[]>response.json().contents );
  }

  getTaskFullDetail (taskId): Observable<TaskFullDetail> {
    let projectParam = (taskId) ? taskId:'';
    let headers = new Headers({ 'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8' });
    let options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + '/ideaflow/timeline/task/' + taskId + '/full', options)
      .map( response => <TaskFullDetail>response.json());
  }

}
