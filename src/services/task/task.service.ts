import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SearchService } from '../search/search.service';
import { Task } from '../../models/task';
import { TaskFullDetail } from '../../models/taskFullDetail';


@Injectable()
export class TaskService {
    private apiUrl = 'http://ideaflowdx.openmastery.org';
    private searchResults: Task[];
    private searchError: string;

    constructor(private http: Http, private searchService: SearchService) {}

    updateEvent(eventPath, jsonPatch) {
        let headers = new Headers({'X-API-Key': 'b4e02226-f96c-4ebc-8c2f-2d2c639948ef', 'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let url = this.apiUrl + "/ideaflow" + eventPath;

        return this.http
            .put(url, jsonPatch, options)
            .map(res => res.json());
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

    search(query: string) {
        this.searchService.searchTasks(query.split(' '))
            .subscribe(
                tasks => this.searchResults = tasks,
                error => this.searchError = error,
            );
    }

}
