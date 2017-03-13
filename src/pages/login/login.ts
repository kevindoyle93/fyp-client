import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {ApiService} from "../../api/providers/api-service";
import {LocalStorage} from "../../providers/local-storage";

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
          this.getAuthToken()
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
          this.navCtrl.push(TabsPage);
        },
        error => console.log(error)
      );
  };

}
