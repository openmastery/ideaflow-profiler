import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import Constants from '../../Constants';
import {User} from '../../app/models/user';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  private apiUrl = 'http://ideaflowdx.openmastery.org';
  private headers = new Headers({'X-API-Key': Constants.X_API_Key, 'Content-Type': 'application/json'});
  private options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {

  }

  create(user: User) {
    return this.http
      .post(this.apiUrl + `/user`,
        JSON.stringify(user),
        this.options);
  }

  save(user: User) {
    const url = this.apiUrl + `/user/${user.id}`;
    return this.http
      .put(url,
        JSON.stringify(user),
        this.options);
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get(this.apiUrl + '/user', this.options)
      .map(response => <User[]>response.json().contents);
  }

  load(id: string): Observable<User> {
    return this.http
      .get(this.apiUrl + `/user/${id}`, this.options)
      .map(response => <User>response.json().contents);
  }

}
