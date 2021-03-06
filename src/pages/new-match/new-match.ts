import { Component } from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';

import {Match} from '../../api/models/Match';
import {Stat} from "../../api/models/Stat";
import {ConfirmMatchModalPage} from "../confirm-match-modal/confirm-match-modal";
import {ApiService} from "../../api/providers/api-service";
import {TacticalAdvice} from "../../api/models/TacticalAdvice";
import {LocalStorage} from "../../providers/local-storage";

@Component({
  selector: 'page-new-match',
  templateUrl: 'new-match.html',
  providers: [ApiService, LocalStorage]
})
export class NewMatchPage {

  match: Match;
  tactics: TacticalAdvice;

  private homeTeamInPossession: boolean = false;
  private awayTeamInPossession: boolean = false;

  private possessionStart: Date;
  private homePossession: number = 0;
  private awayPossession : number = 0;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public apiService: ApiService, public localStorage: LocalStorage) {
    this.match = Match.createBlank();
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

  onPossessionChange = (team: string) => {
    // Handle use clicking the team already in possession
    if ((team == 'home' && this.homeTeamInPossession) ||
        (team == 'away' && this.awayTeamInPossession) ||
        (team == 'none' && !this.homeTeamInPossession && !this.awayTeamInPossession)) {
      return;
    }

    // If neither team had possession, no updating of the possession stats needs to occur
    if (!this.homeTeamInPossession && !this.awayTeamInPossession) {
      if (team == 'home') {
        this.homeTeamInPossession = true;
      }
      if (team == 'away') {
        this.awayTeamInPossession = true;
      }
      this.possessionStart = new Date();
      return;
    }

    // If possession is switching from a team, the stats need to be updated
    if (this.homeTeamInPossession) {
      this.updatePossessionStats('home');
      this.homeTeamInPossession = false;
      this.awayTeamInPossession = team == 'away';
    } else if (this.awayTeamInPossession) {
      this.updatePossessionStats('away');
      this.awayTeamInPossession = false;
      this.homeTeamInPossession = team == 'home';
    }
  };

  private updatePossessionStats = (teamInPossession: string) => {
    if (teamInPossession == 'home') {
        this.homePossession += new Date().getTime() - this.possessionStart.getTime();
    } else {
      this.awayPossession += new Date().getTime() - this.possessionStart.getTime();
    }

    let totalPossession = this.homePossession + this.awayPossession;
    let homePossessionPercentage = Math.round(this.homePossession / totalPossession * 1000) / 10;
    let awayPossessionPercentage = Math.round(this.awayPossession / totalPossession * 1000) / 10;
    this.match.stats[2].homeValue = homePossessionPercentage;
    this.match.stats[2].awayValue = awayPossessionPercentage;
    this.possessionStart = new Date();
  };

  showConfirmationModal = () => {
    let confirmationModal = this.modalCtrl.create(ConfirmMatchModalPage, {match: this.match});
    confirmationModal.onDidDismiss(data => {
      if (data.confirmed) {
        this.fetchTactics(data.matchData);

        if (this.localStorage.getToken()) {
          this.postMatch();
        }
      }
    });
    confirmationModal.present();
  };

  private postMatch = () => {
    let match = {};
    match['home_team'] = this.match.homeTeam;
    match['away_team'] = this.match.awayTeam;
    match['date'] = this.match.date;
    match['coach_team_is_home_team'] = this.match.coachTeamIsHomeTeam;
    match['full_time_home_goals'] = this.match.stats[0].homeValue;
    match['full_time_away_goals'] = this.match.stats[0].awayValue;
    match['half_time_home_goals'] = this.match.stats[1].homeValue;
    match['half_time_away_goals'] = this.match.stats[1].awayValue;

    for (let i = 2; i < this.match.stats.length; i++) {
      let stat = this.match.stats[i];
      match['home_' + stat.apiName] = stat.homeValue;
      match['away_' + stat.apiName] = stat.awayValue;
    }

    this.apiService.postMatch(match, this.localStorage.getToken())
      .subscribe(
        res => {
          this.match.id = res['id'];
          this.localStorage.addNewMatch(this.match);
        },
        error => console.log(error)
      );
  };

  private fetchTactics = (matchData) => {
    this.apiService.getTacticalAdvice(matchData)
      .subscribe(
        res => {
          this.tactics = res['tactical_advice'];
          console.log(res);
        },
        error => console.log(error)
      );
  }
}
