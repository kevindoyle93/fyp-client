import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Match} from '../../models/Match';
import {MatchPage} from "../match/match";

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
  entryComponents: [MatchPage]
})
export class MatchesPage {

  matches: Array<Match>;

  constructor(public navCtrl: NavController) {
    this.fetchMatches();
  }

  private fetchMatches = () => {
    this.matches = [
      new Match('Man United', 'Man City', 2, 2, new Date(2017, 2, 24)),
      new Match('Chelsea', 'Man United', 1, 0, new Date(2017, 2, 17)),
      new Match('West Ham', 'Man United', 0, 2, new Date(2017, 2, 14)),
      new Match('Man United', 'Stoke City', 3, 1, new Date(2017, 2, 9)),
    ]
  };

  onMatchClicked = (match: any) => {
    this.navCtrl.push(MatchPage, {
      match: match
    });
  };

  onNewMatchClicked = () => {
    console.log('New match');
  }

}
