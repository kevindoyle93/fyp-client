import { Component } from '@angular/core';

import { MatchesPage } from '../matches/matches';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MatchesPage;
  tab2Root: any = ContactPage;

  constructor() {

  }
}
