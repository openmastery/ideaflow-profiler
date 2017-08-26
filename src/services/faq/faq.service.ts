import { Injectable } from '@angular/core';
import { Headers, Http, BaseRequestOptions, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import Constants from '../../Constants';
import { FaqSummary } from '../../models/faqSummary';


@Injectable()
export class FaqService {
  private apiUrl = 'http://om-ideaflow.herokuapp.com/';

  constructor(private http: Http ){

  }

  getFaqs (): Observable<FaqSummary[]> {
    let headers = new Headers({ 'X-API-Key': Constants.X_API_Key });
    let options = new RequestOptions({headers: headers});

    return this.http
      .get(this.apiUrl + 'storyweb/faq', options)
      .map( response => <FaqSummary[]>response.json().contents );
  }


}
