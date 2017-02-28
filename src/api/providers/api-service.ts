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
  private readonly matchUrl = 'https://plsuchttai.localtunnel.me/api/get_tactical_advice/';

  constructor(http: Http) {
    this.http = http;
  }

  postMatch = (match: any): Observable<TacticalAdvice[]> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = new FormData();
    for (let key in match) {
      if (match.hasOwnProperty(key)) {
        body.append(key, match[key]);
      }
    }

    return this.http.post(this.matchUrl, body, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      // .map((res: Response) => {
      //   return MockTacticalAdvice.TacticalAdviceArray().results;
      // })
      // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

}
