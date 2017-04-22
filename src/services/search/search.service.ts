import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Task } from '../../models/task';

@Injectable()
export class SearchService {
    private apiUrl = 'http://om-ideaflow.herokuapp.com/';

    constructor(private http: Http) {}

    searchTasks(searchTerms: string[]): Observable<Task[]> {
        const headers = new Headers({ 'X-API-Key': '57f533ed-cafa-494b-8d41-6ef68ef955bb' });
        const queryString = new URLSearchParams();
        queryString.paramsMap = new Map();
        queryString.paramsMap.set('tag', searchTerms);

        const options = new RequestOptions({
            headers: headers,
            search: queryString,
        });

        return this.http.get(this.apiUrl + 'ideaflow/task', options)
            .map(response => <Task[]>response.json().contents);
    }
}
