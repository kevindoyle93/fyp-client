import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TacticalAdvice} from "../../api/models/TacticalAdvice";

@Component({
  selector: 'page-tactical-advice',
  templateUrl: 'tactical-advice.html'
})
export class TacticalAdvicePage {

  tacticalAdvice: TacticalAdvice;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('tacticalAdvice'));
    this.tacticalAdvice = navParams.get('tacticalAdvice');
  }

}
