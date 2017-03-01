import { Component } from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';

import {Match} from '../../api/models/Match';
import {Stat} from "../../api/models/Stat";
import {ConfirmMatchModalPage} from "../confirm-match-modal/confirm-match-modal";
import {ApiService} from "../../api/providers/api-service";
import {TacticalAdvice} from "../../api/models/TacticalAdvice";

@Component({
  selector: 'page-new-match',
  templateUrl: 'new-match.html',
  providers: [ApiService]
})
export class NewMatchPage {

  match: Match;
  tactics: TacticalAdvice;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public apiService: ApiService) {
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

  showConfirmationModal = () => {
    let confirmationModal = this.modalCtrl.create(ConfirmMatchModalPage, {match: this.match});
    confirmationModal.onDidDismiss(data => {
      if (data.confirmed) {
        this.fetchTactics(data.matchData);
      }
    });
    confirmationModal.present();
  };

  private fetchTactics = (matchData) => {
    this.apiService.postMatch(matchData)
      .subscribe(
        res => {
          this.tactics = res['tactical_advice'];
          console.log(res);
        },
        error => console.log(error)
      );
  }
}
