import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {Match} from '../../models/Match';
import {TacticalAdvice} from "../../models/TacticalAdvice";

@Component({
  selector: 'page-match',
  templateUrl: 'match.html'
})
export class MatchPage {

  match: Match;
  tactics: Array<TacticalAdvice>;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.match = navParams.get('match');
    this.fetchTactics();
  }

  private fetchTactics = () => {
    this.tactics = [
      new TacticalAdvice(
        'Decrease Shots on Target Against',
        'Decreasing your opponent\'s shots on target by 2 would have increased the probability of a victory from 42% to 71%',
        ['1 v 1 Defending the Dribble', 'High Pressing']
      ),
      new TacticalAdvice(
        'Increase Shots on Target',
        'Increasing your shots on target by 1 would have increased the probability of a victory from 68% to 78%',
        ['Diagonal Layoff', '1 Touch Combinations']
      ),
    ]
  }

}
