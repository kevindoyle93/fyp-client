import { Component } from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';

import {Match} from '../../models/Match';

@Component({
  selector: 'page-match',
  templateUrl: 'match.html'
})
export class MatchPage {

  match: Match;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.match = navParams.get('match');
  }

}
