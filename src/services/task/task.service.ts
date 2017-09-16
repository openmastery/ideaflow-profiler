import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import Constants from '../../Constants';
import { Task } from '../../models/task';
import { TaskFullDetail } from '../../models/taskFullDetail';
import {User} from "../../app/models/user";


@Injectable()
export class TaskService {
  private apiUrl = 'http://ideaflowdx.openmastery.org';
  private mostRecentApiKey = Constants.X_API_Key;

  constructor(private http: Http ){

  }

  updateEvent(eventPath, jsonPatch) {
    let headers = new Headers({'X-API-Key': this.mostRecentApiKey, 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    let url = this.apiUrl + "/ideaflow" + eventPath;

    return this.http
      .put(url, jsonPatch, options)
      .map(res => res.json());
  }

  getTasksForUser (user: User): Observable<Task[]> {
    //TODO fix this ugly side-effect hack
    this.mostRecentApiKey = user.apiKey;

    const headers = new Headers({ 'X-API-Key': this.mostRecentApiKey });
    const options = new RequestOptions({headers: headers});



    return this.http
      .get(this.apiUrl + '/ideaflow/task/user/'+user.id, options)
      .map( response => <Task[]>response.json().contents );
  }

  getTasks (project): Observable<Task[]> {
    let projectParam = (project) ? project:'';
    let headers = new Headers({ 'X-API-Key': Constants.X_API_Key });
    let options = new RequestOptions({headers: headers});
    let params = (projectParam) ? '?project='+projectParam:'';

    return this.http
      .get(this.apiUrl + '/ideaflow/task' + params, options)
      .map( response => <Task[]>response.json().contents );
  }

  getTaskFullDetail (taskId): Observable<TaskFullDetail> {
    let projectParam = (taskId) ? taskId:'';
    let headers = new Headers({ 'X-API-Key': this.mostRecentApiKey });
    let options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + '/ideaflow/timeline/task/' + taskId + '/full', options)
      .map( response => <TaskFullDetail>response.json());
  }

}
