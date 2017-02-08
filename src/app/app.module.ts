import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TacticsPage } from '../pages/tactics/tactics';
import { MatchesPage } from '../pages/matches/matches';
import { TabsPage } from '../pages/tabs/tabs';
import {MatchPage} from "../pages/match/match";
import {NewMatchPage} from "../pages/new-match/new-match";

@NgModule({
  declarations: [
    MyApp,
    TacticsPage,
    MatchesPage,
    TabsPage,
    MatchPage,
    NewMatchPage
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
    TacticsPage,
    MatchesPage,
    TabsPage,
    MatchPage,
    NewMatchPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
