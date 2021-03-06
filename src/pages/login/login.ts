import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
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

  private loadingSpinner: any;

  constructor(public navCtrl: NavController, public apiService: ApiService, public localStorage: LocalStorage, public loadCtrl: LoadingController, public toastCtrl: ToastController) {
    if (localStorage.getToken() || localStorage.get('skippedLogin')) {
      navCtrl.push(TabsPage);
    }
  }

  public register = () => {
    if (!this.validateForm()) {
      return;
    }

    this.showLoadingSpinner();

    this.apiService.registerUser(this.username, this.password)
      .subscribe(
        res => {
          this.getAuthToken();
        },
        error => {
          if (error.status === 400) {
            this.toastCtrl.create({
              message: 'A user with that username already exists',
              duration: 3000,
            }).present();
          } else {
            this.toastCtrl.create({
              message: 'We are experiencing technical difficulties, please try again',
              duration: 3000,
            }).present();
          }
          this.loadingSpinner.dismiss();
        }
      );

  } ;

  public login = () => {
    if (!this.validateForm()) {
      return;
    }

    this.showLoadingSpinner();

    this.getAuthToken();
  };

  public skipLogin = () => {
    this.localStorage.set('skippedLogin', true);
    this.navCtrl.push(TabsPage);
  };

  private validateForm = () => {
    if (!this.username || !this.password) {
      this.toastCtrl.create({
        message: 'Please enter a username and password',
        duration: 3000,
      }).present();

      return false;
    }
    return true;
  };

  private getAuthToken = () => {
    this.apiService.getAuthToken(this.username, this.password)
      .subscribe(
        res => {
          this.localStorage.setToken(res['token']);
          this.checkForExistingMatches(res['token']);
        },
        error => {
          if (error.status === 400) {
            this.toastCtrl.create({
              message: 'Your username or password were incorrect',
              duration: 3000,
            }).present();
          } else {
            this.toastCtrl.create({
              message: 'We are experiencing technical difficulties, please try again',
              duration: 3000,
            }).present();
          }
          this.loadingSpinner.dismiss();
        }
      );
  };

  private checkForExistingMatches = (token: string) => {
    this.apiService.getMatches(token)
      .subscribe(
        res => {
          for (let i = 0; i < res['results'].length; i++) {
            let m = res['results'][i];
            console.log(m);
            let match = new Match(
              m['home_team'], m['away_team'], new Date(Date.parse(m['date'])), m['full_time_home_goals'],
              m['full_time_away_goals'], m['half_time_home_goals'], m['half_time_away_goals'],
              Number(m['home_possession']), Number(m['away_possession']), m['home_total_shots'],
              m['away_total_shots'], m['home_shots_on_target'], m['away_shots_on_target'],
              m['home_corners'], m['away_corners'], m['home_fouls'], m['away_fouls'],
              m['home_yellow_cards'], m['away_yellow_cards'], m['home_red_cards'], m['away_red_cards']
            );
            match.coachTeamIsHomeTeam = m['coach_team_is_home_team'];
            match.id = m['id'];
            console.log(match)
            this.localStorage.addNewMatch(match);
          }

          this.loadingSpinner.dismiss();
          this.navCtrl.push(TabsPage);
        },
        error => console.log(error)
      );
  };

  private showLoadingSpinner = () => {
    this.loadingSpinner = this.loadCtrl.create({
      content: 'Please wait...'
    });
    this.loadingSpinner.present();
  }

}
