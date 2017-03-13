import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {LocalStorage} from "../../providers/local-storage";

@Component({
  selector: 'page-login-logout-popover',
  templateUrl: 'login-logout-popover.html',
  providers: [LocalStorage]
})
export class LoginLogoutPopoverPage {

  userIsLoggedIn: boolean;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public localStorage: LocalStorage) {
    this.userIsLoggedIn = navParams.get('loggedIn');
  }

  logout = () => {
    this.localStorage.setToken(null);
    this.localStorage.clearMatches();
    this.goToLogin();
  };

  goToLogin = () => {
    this.viewCtrl.dismiss({goToLogin: true});
  };

}
