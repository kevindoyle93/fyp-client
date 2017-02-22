import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {TacticalAdvice} from "../../api/models/TacticalAdvice";

@Component({
  selector: 'page-tactics',
  templateUrl: 'tactics.html'
})
export class TacticsPage {

  tactics: Array<TacticalAdvice>;

  constructor(public navCtrl: NavController) {
    this.fetchTactics();
  }

  private fetchTactics = () => {
    this.tactics = [
      new TacticalAdvice(
        'Increase Shots on Target',
        'Rather than simply increasing the number of shots your team is taking, concentrate on improving the number of shots that hit the target. This could be acheived by practicing shooting to improve accuracy, or by moving the ball into better areas to shoot from.',
        ['Diagonal Layoff', '1 Touch Combinations', 'Supporting the Player with the Ball']
      ),
      new TacticalAdvice(
        'Decrease Yellow Cards',
        'Players with early yellow cards must play more carefully for the rest of the match, potentially negatively effecting their performance. Practice more conservative tackling to decrease the chances of picking up yellow cards.',
        ['1 v 1 Defending the Dribble', 'Shepherding Players Without Tackling']
      ),
    ]
  }

}
