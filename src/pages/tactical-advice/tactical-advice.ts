import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tactical-advice',
  templateUrl: 'tactical-advice.html'
})
export class TacticalAdvicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('tacticalAdvice'));
  }

}
