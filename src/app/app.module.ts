import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TacticsPage } from '../pages/tactics/tactics';
import { MatchesPage } from '../pages/matches/matches';
import { TabsPage } from '../pages/tabs/tabs';
import {MatchPage} from "../pages/match/match";
import {NewMatchPage} from "../pages/new-match/new-match";
import {ConfirmMatchModalPage} from "../pages/confirm-match-modal/confirm-match-modal";
import {LoginPage} from "../pages/login/login";
import {LoginLogoutPopoverPage} from "../pages/login-logout-popover/login-logout-popover";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TacticsPage,
    MatchesPage,
    TabsPage,
    MatchPage,
    NewMatchPage,
    ConfirmMatchModalPage,
    LoginLogoutPopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TacticsPage,
    MatchesPage,
    TabsPage,
    MatchPage,
    NewMatchPage,
    ConfirmMatchModalPage,
    LoginLogoutPopoverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
