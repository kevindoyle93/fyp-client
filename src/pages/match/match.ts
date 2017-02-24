import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {Match} from '../../api/models/Match';
import {TacticalAdvice} from "../../api/models/TacticalAdvice";
import {ApiService} from "../../api/providers/api-service";

@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
  providers: [ApiService]
})
export class MatchPage {

  match: Match;
  tactics: Array<TacticalAdvice>;

  constructor(public navCtrl: NavController, navParams: NavParams, public apiService: ApiService) {
    this.match = navParams.get('match');
    this.fetchTactics();
  }

  private fetchTactics = () => {
    this.apiService.postMatch(Match.createBlank())
      .subscribe(
        tactics => {
          this.tactics = tactics;
        },
        error => console.log(error)
      );
  }

}
