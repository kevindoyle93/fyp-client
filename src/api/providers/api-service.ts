import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import  {Match} from '../models/Match';
import  {TacticalAdvice} from '../models/TacticalAdvice';
import {MockTacticalAdvice} from "../mock/mock-tactical-advice";

@Injectable()
export class ApiService {

  private http: Http;
  private readonly matchUrl = 'http://ip.jsontest.com/?mime=5';

  constructor(http: Http) {
    this.http = http;
  }

  postMatch = (match: Match): Observable<TacticalAdvice[]> => {
    return this.http.post(this.matchUrl, match)
      // .map((res: Response) => res.json())
      // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      .map((res: Response) => {
        return MockTacticalAdvice.TacticalAdviceArray().results;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

}
