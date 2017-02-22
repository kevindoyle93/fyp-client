import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import  {Match} from '../models/Match';
import  {TacticalAdvice} from '../models/TacticalAdvice';

@Injectable()
export class ApiService {

  private http: Http;
  private readonly matchUrl = '';

  constructor(http: Http) {
    this.http = http;
  }

  postMatch = (match: Match): Observable<TacticalAdvice[]> => {
    return this.http.post(this.matchUrl, match)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  };

}
