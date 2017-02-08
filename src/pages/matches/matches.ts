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
      new Match('Man United', 'Man City', new Date(2017, 2, 24), 2, 2, 1, 0, 50, 50, 11, 10, 6, 7, 3, 1, 6, 9, 1, 2, 0, 0),
      new Match('Chelsea', 'Man United', new Date(2017, 2, 17), 1, 0, 0, 0, 50, 50, 11, 10, 6, 7, 3, 1, 6, 9, 1, 2, 0, 0),
      new Match('West Ham', 'Man United', new Date(2017, 2, 14), 0, 2, 1, 0, 50, 50, 11, 10, 6, 7, 3, 1, 6, 9, 1, 2, 0, 0),
      new Match('Man United', 'Stoke City', new Date(2017, 2, 9), 3, 1, 1, 0, 50, 50, 11, 10, 6, 7, 3, 1, 6, 9, 1, 2, 0, 0),
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
