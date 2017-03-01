import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Match} from "../../api/models/Match";

@Component({
  selector: 'page-confirm-match-modal',
  templateUrl: 'confirm-match-modal.html'
})
export class ConfirmMatchModalPage {

  match: Match;

  constructor(public viewCtrl: ViewController, navParams: NavParams) {
    this.match = navParams.get('match');
    console.log(this.match);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmMatchModalPage');
  }

  dismiss = () => {
    this.viewCtrl.dismiss();
  }

}
