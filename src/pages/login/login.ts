import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {ApiService} from "../../api/providers/api-service";
import {LocalStorage} from "../../providers/local-storage";
import {Match} from "../../api/models/Match";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ApiService, LocalStorage]
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService, public localStorage: LocalStorage) {
    if (localStorage.getToken()) {
      navCtrl.push(TabsPage);
    }
  }

  public login = () => {
    console.log(this.username + ':' + this.password);
    this.apiService.registerUser(this.username, this.password)
      .subscribe(
        res => {
          this.getAuthToken();
        },
        error => this.getAuthToken()
      );
  };

  public skipLogin = () => {
    this.navCtrl.push(TabsPage);
  };

  private getAuthToken = () => {
    this.apiService.getAuthToken(this.username, this.password)
      .subscribe(
        res => {
          this.localStorage.setToken(res['token']);
          this.checkForExistingMatches(res['token']);
        },
        error => console.log(error)
      );
  };

  private checkForExistingMatches = (token: string) => {
    this.apiService.getMatches(token)
      .subscribe(
        res => {
          for (let i = 0; i < res['results'].length; i++) {
            let match = res['results'][i];
            this.localStorage.addNewMatch(new Match(
              match['home_team'], match['away_team'], new Date(Date.parse(match['date'])), match['full_time_home_goals'],
              match['full_time_away_goals'], match['half_time_home_goals'], match['half_time_away_goals'],
              Number(match['home_possession']), Number(match['away_possession']), match['home_total_shots'],
              match['away_total_shots'], match['home_shots_on_target'], match['away_shots_on_target'],
              match['home_corners'], match['away_corners'], match['home_fouls'], match['away_fouls'],
              match['home_yellow_cards'], match['away_yellow_cards'], match['home_red_cards'], match['away_red_cards']

            ));
          }

          console.log(this.localStorage.getMatches());
          this.navCtrl.push(TabsPage);
        },
        error => console.log(error)
      );
  };

}
