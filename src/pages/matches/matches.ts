import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Match} from '../../api/models/Match';
import {MatchPage} from "../match/match";
import {NewMatchPage} from "../new-match/new-match";
import {LocalStorage} from "../../providers/local-storage";

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
  entryComponents: [MatchPage],
  providers: [LocalStorage]
})
export class MatchesPage {

  matches: Array<Match>;

  constructor(public navCtrl: NavController, public localStorage: LocalStorage) {

  }

  // Called when this page loads, including when returned to the top of the view stack
  ionViewDidEnter() {
    this.fetchMatches();
  };

  private fetchMatches = () => {
    this.matches = this.localStorage.getMatches();
  };

  onMatchClicked = (match: any) => {
    this.navCtrl.push(MatchPage, {
      match: match
    });
  };

  onNewMatchClicked = () => {
    this.navCtrl.push(NewMatchPage);
  }

}
