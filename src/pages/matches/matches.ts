import { Component } from '@angular/core';

import {NavController, PopoverController, App, AlertController} from 'ionic-angular';

import {Match} from '../../api/models/Match';
import {MatchPage} from "../match/match";
import {NewMatchPage} from "../new-match/new-match";
import {LocalStorage} from "../../providers/local-storage";
import {LoginLogoutPopoverPage} from "../login-logout-popover/login-logout-popover";
import {ApiService} from "../../api/providers/api-service";

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html',
  entryComponents: [MatchPage],
  providers: [LocalStorage, ApiService]
})
export class MatchesPage {

  public matches: Array<Match> = [];

  constructor(public navCtrl: NavController, public appCtrl: App, public localStorage: LocalStorage, public popoverCtrl: PopoverController, public alertCtrl: AlertController, public apiService: ApiService) {

  }

  // Called when this page loads, including when returned to the top of the view stack
  ionViewDidEnter() {
    this.fetchMatches();
  };

  private fetchMatches = () => {
    this.matches = this.localStorage.getMatches();
  };

  onMatchClicked = (match: Match) => {
    this.navCtrl.push(MatchPage, {
      match: match
    });
  };

  onMatchLongPressed = (match: Match) => {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this match?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteMatch(match);
          }
        }
      ]
    });
    alert.present();
  };

  onNewMatchClicked = () => {
    this.navCtrl.push(NewMatchPage);
  };

  presentPopover = (event) => {
    let popover = this.popoverCtrl.create(LoginLogoutPopoverPage, {loggedIn: this.localStorage.getToken()});
    popover.onDidDismiss((data) => {
      if (data.goToLogin) {
        this.appCtrl.getRootNav().popToRoot();
      }
    });
    popover.present({ev: event});
  };

  private deleteMatch = (match: Match) => {
    // Delete the match from the current screen
    this.matches.splice(this.matches.indexOf(match), 1);

    // Delete the match in local storage
    this.localStorage.deleteMatch(match);

    // Delete the match in the backend
    this.apiService.deleteMatch(match.id, this.localStorage.getToken())
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  };
}
