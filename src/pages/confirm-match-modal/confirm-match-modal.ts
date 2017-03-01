import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-confirm-match-modal',
  templateUrl: 'confirm-match-modal.html'
})
export class ConfirmMatchModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmMatchModalPage');
  }

}
