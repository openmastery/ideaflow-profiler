import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { FaqSummary } from '../../models/faqSummary';


@Injectable()
export class AccountService {
  private apiUrl = 'http://om-ideaflow.herokuapp.com/';

  constructor(private http: Http ){

  }

  getAccounts (): Observable<Account[]> {
    let headers = new Headers({ 'X-API-Key': '2fe730cb-7b7b-4cf6-8228-0698c457cda8' });
    let options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + 'account', options)
      .map( response => <Account[]>response.json().contents );
  }


}
