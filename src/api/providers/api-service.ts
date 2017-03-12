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
  private readonly baseUrl: string = 'http://localhost:8000/api/';
  private readonly registerEndpoint: string = 'coaches/';
  private readonly getAuthTokenEndpoint: string = 'api-token-auth/';
  private readonly matchEndpoint = 'get_tactical_advice/';

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

  getTacticalAdvice = (match: any): Observable<TacticalAdvice[]> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = new FormData();
    for (let key in match) {
      if (match.hasOwnProperty(key)) {
        body.append(key, match[key]);
      }
    }

    return this.http.post(this.baseUrl + this.matchEndpoint, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

}
