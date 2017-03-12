import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Match} from "../../api/models/Match";

@Component({
  selector: 'page-confirm-match-modal',
  templateUrl: 'confirm-match-modal.html'
})
export class ConfirmMatchModalPage {

  match: Match;
  halfTimeHomeGoals: number = 0;
  halfTimeAwayGoals: number = 0;
  userTeamIsHomeTeam: boolean;

  constructor(public viewCtrl: ViewController, navParams: NavParams) {
    this.match = navParams.get('match');
    console.log(this.match);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmMatchModalPage');
  }

  changeUsersTeam = (homeTeam: boolean) => {
    this.userTeamIsHomeTeam = homeTeam;
    console.log(this.userTeamIsHomeTeam);
  };

  dismiss = () => {
    this.viewCtrl.dismiss({confirmed: false});
  };

  confirm = () => {
    this.viewCtrl.dismiss({
      confirmed: true,
      matchData: Match.convertMatchForBackend(this.match, this.userTeamIsHomeTeam)
    });
  };

}
