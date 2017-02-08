import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';

import {Match} from '../../models/Match';

@Component({
  selector: 'page-new-match',
  templateUrl: 'new-match.html'
})
export class NewMatchPage {

  match: Match;

  constructor(public navCtrl: NavController) {
    this.match = new Match(
      'Man United',
      'Liverpool',
      new Date(),
      0, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    );
  }

  onHomeGoalsChange = (amount: number) => {this.match.fullTimeHomeGoals += amount;};
  onAwayGoalsChange = (amount: number) => {this.match.fullTimeAwayGoals += amount;};
  onHomeTotalShotsChange = (amount: number) => {this.match.homeTotalShots += amount;};
  onAwayTotalShotsChange = (amount: number) => {this.match.awayTotalShots += amount;};
  onHomeShotsOnTargetChange = (amount: number) => {this.match.homeShotsOnTarget += amount;};
  onAwayShotsOnTargetChange = (amount: number) => {this.match.awayShotsOnTarget += amount;};
  onHomeCornersChange = (amount: number) => {this.match.homeCorners += amount;};
  onAwayCornersChange = (amount: number) => {this.match.awayCorners += amount;};
  onHomeFoulsChange = (amount: number) => {this.match.homeFouls += amount;};
  onAwayFoulsChange = (amount: number) => {this.match.awayFouls += amount;};
  onHomeYellowCardsChange = (amount: number) => {this.match.homeYellowCards += amount;};
  onAwayYellowCardsChange = (amount: number) => {this.match.awayYellowCards += amount;};
  onHomeRedCardsChange = (amount: number) => {this.match.homeRedCards += amount;};
  onAwayRedCardsChange = (amount: number) => {this.match.awayRedCards += amount;};

}
