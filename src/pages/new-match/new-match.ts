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

}
