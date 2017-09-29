import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import Constants from '../../Constants';
import { Task } from '../../models/task';
import { TaskFullDetail } from '../../models/taskFullDetail';
import { User } from '../../app/models/user';


@Injectable()
export class TaskService {
  private apiUrl = 'http://ideaflowdx.openmastery.org';
  private mostRecentApiKey = Constants.X_API_Key;

  constructor(private http: Http ){

  }

  updateEvent(eventPath, jsonPatch) {
    const headers = new Headers({'X-API-Key': this.mostRecentApiKey, 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    const url = this.apiUrl + '/ideaflow' + eventPath;

    return this.http
      .put(url, jsonPatch, options)
      .map(res => res.json());
  }

  getTasksForUser (user: User): Observable<Task[]> {
    // TODO fix this ugly side-effect hack
    this.mostRecentApiKey = user.apiKey;

    const headers = new Headers({ 'X-API-Key': this.mostRecentApiKey });
    const options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + `/ideaflow/task/user/${user.id}`, options)
      .map( response => <Task[]>response.json().contents );
  }

  getTasks (project): Observable<Task[]> {
    const projectParam = project ? project : '';
    const headers = new Headers({ 'X-API-Key': Constants.X_API_Key });
    const options = new RequestOptions({headers: headers});
    const params = projectParam ? '?project=' + projectParam : '';

    return this.http
      .get(this.apiUrl + '/ideaflow/task' + params, options)
      .map( response => <Task[]>response.json().contents );
  }

  getTaskFullDetail (taskId): Observable<TaskFullDetail> {
    const projectParam = taskId ? taskId : '';
    const headers = new Headers({ 'X-API-Key': this.mostRecentApiKey });
    const options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + '/ideaflow/timeline/task/' + taskId + '/full', options)
      .map( response => <TaskFullDetail>response.json());
  }

}
