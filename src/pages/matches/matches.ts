import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Match} from '../../models/Match';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage {

  matches: Array<Match>;

  constructor(public navCtrl: NavController) {
    this.fetchMatches();
  }

  private fetchMatches = () => {
    this.matches = [
      new Match('Man United', 'Man City', 2, 2, new Date(2017, 2, 24)),
      /*{
        homeTeam: 'Man United',
        awayTeam: 'Man City',
        fullTimeHomeGoals: 2,
        fullTimeAwayGoals: 2,
        date: '24/02/2017'
      },
      {
        homeTeam: 'Chelsea',
        awayTeam: 'Man United',
        fullTimeHomeGoals: 1,
        fullTimeAwayGoals: 0,
        date: '17/02/2017'
      },
      {
        homeTeam: 'West Ham',
        awayTeam: 'Man United',
        fullTimeHomeGoals: 0,
        fullTimeAwayGoals: 2,
        date: '14/02/2017'
      }*/
    ]
  };

  onMatchClicked = (match: any) => {
    console.log(match);
  };

  onNewMatchClicked = () => {
    console.log('New match');
  }

}
