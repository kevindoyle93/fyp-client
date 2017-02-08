import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';

import {Match} from '../../models/Match';
import {Stat} from "../../models/Stat";

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

  onStatChange = (amount: number, team: number, stat: Stat) => {
    if (team === 0) {
      if (amount === 1 || (amount === -1 && stat.homeValue > 0)) {
        stat.homeValue += amount;
      }
    } else if (team === 1) {
      if (amount === 1 || (amount === -1 && stat.awayValue > 0)) {
        stat.awayValue += amount;
      }
    }
  };
}
