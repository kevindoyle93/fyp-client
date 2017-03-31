import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import  {Match} from '../models/Match';
import  {TacticalAdvice} from '../models/TacticalAdvice';
import {MockTacticalAdvice} from "../mock/mock-tactical-advice";

@Injectable()
export class ApiService {

  private http: Http;
  // private readonly baseUrl: string = 'http://localhost:8000/api/';
  private readonly baseUrl: string = 'https://www.fyp-football-analysis.top/api/';
  private readonly registerEndpoint: string = 'coaches/';
  private readonly getAuthTokenEndpoint: string = 'api-token-auth/';
  private readonly tacticalAdviceEndpoint = 'get_tactical_advice/';
  private readonly matchEndpoint = 'coaches/matches';

  constructor(http: Http) {
    this.http = http;
  }

  registerUser = (username: string, password: string) => {
    return this.http.post(this.baseUrl + this.registerEndpoint, {username: username, password: password})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  getAuthToken = (username: string, password: string) => {
    return this.http.post(this.baseUrl + this.getAuthTokenEndpoint, {username: username, password: password})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

  getMatches = (token: string) => {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization','Token ' + token);
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.baseUrl + this.matchEndpoint, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error));
  };

  postMatch = (match, token: string) => {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization','Token ' + token);
    let options = new RequestOptions({headers: headers});

    let body = {};
    for (let key in match) {
      if (match.hasOwnProperty(key)) {
        body[key] = match[key];
      }
    }

    return this.http.post(this.baseUrl + this.matchEndpoint, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || error));
  };

  getTacticalAdvice = (match: any): Observable<TacticalAdvice[]> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = new FormData();
    for (let key in match) {
      if (match.hasOwnProperty(key)) {
        body.append(key, match[key]);
      }
    }

    return this.http.post(this.baseUrl + this.tacticalAdviceEndpoint, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

}
