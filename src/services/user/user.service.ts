import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import Constants from '../../Constants';
import {Task} from '../../models/task';
import {TaskFullDetail} from '../../models/taskFullDetail';
import {User} from '../../app/models/user';


@Injectable()
export class UserService {
  private apiUrl = 'http://ideaflowdx.openmastery.org';

  constructor(private http: Http) {

  }

  newUser(user: User) {
    const headers = new Headers({'X-API-Key': Constants.X_API_Key, 'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});

    const url = this.apiUrl + `/ideaflow/user`;

    return this.http
      .post(url,
        JSON.stringify(user),
        options);
  }

  getUsers(): Observable<User[]> {
    const headers = new Headers({'X-API-Key': Constants.X_API_Key});
    const options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + '/ideaflow/user', options)
      .map(response => <User[]>response.json().contents);
  }
}
