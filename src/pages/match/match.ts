import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {Match} from '../../api/models/Match';
import {TacticalAdvice} from "../../api/models/TacticalAdvice";
import {ApiService} from "../../api/providers/api-service";
import {LocalStorage} from "../../providers/local-storage";

@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
  providers: [ApiService, LocalStorage]
})
export class MatchPage {

  match: Match;
  tactics: Array<TacticalAdvice>;

  constructor(public navCtrl: NavController, navParams: NavParams, public apiService: ApiService, public localStorage: LocalStorage) {
    this.match = navParams.get('match');
    this.fetchTactics();
  }

  private fetchTactics = () => {
    this.apiService.getTacticalAdvice(Match.testApi())
      .subscribe(
        res => {
          this.tactics = res['tactical_advice'];
          console.log(res);
        },
        error => console.log(error)
      );
  }

}
