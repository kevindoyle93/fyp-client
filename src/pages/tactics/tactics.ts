import {Component, ViewChild} from '@angular/core';

import { NavController } from 'ionic-angular';
import {Chart} from 'chart.js';

import {TacticalAdvice} from "../../api/models/TacticalAdvice";
import {Match} from "../../api/models/Match";
import {LocalStorage} from "../../providers/local-storage";

@Component({
  selector: 'page-tactics',
  templateUrl: 'tactics.html',
  providers: [LocalStorage]
})
export class TacticsPage {

  @ViewChild('goalsCanvas') goalsCanvas;
  @ViewChild('halfTimeGoalsCanvas') halfTimeGoalsCanvas;

  goalsChart: any;
  halfTimeGoalsChart: any;

  tactics: Array<TacticalAdvice>;
  matches: Array<Match>;

  constructor(public navCtrl: NavController, public localStorage: LocalStorage) {
    this.fetchTactics();
    this.fetchMatches();
  }

  ionViewDidLoad() {
    let datasets = this.createChartData(this.matches);

    this.goalsChart = new Chart(this.goalsCanvas.nativeElement, datasets[0]);
    this.halfTimeGoalsChart = new Chart(this.halfTimeGoalsCanvas.nativeElement, datasets[1]);
  }

  private fetchMatches = () => {
    this.matches = this.localStorage.getMatches();
  };

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
  };

  private createChartData = (matches: Array<Match>) => {
    let numMatches = matches.length;
    if (numMatches == 0) {
      return;
    }

    // Create the structure to hold the object for each stat
    let statsDatasets = [];
    for (let i = 0; i < matches[0].stats.length; i++) {
      statsDatasets.push({
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: 'rgba(76, 175, 80, 0.4)'
          }]
        },
        options: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Last ' + numMatches + ' Matches'
          }
        }
      });
    }

    for (let i = 0; i < matches.length; i++) {
      let match = this.matches[i];
      let m = Match.convertMatchForBackend(match);

      statsDatasets[0].data.labels.push('');
      statsDatasets[0].data.datasets[0].data.push(m['full_time_goals']);

      statsDatasets[1].data.labels.push('');
      statsDatasets[1].data.datasets[0].data.push(m['half_time_goals']);

    }

    return statsDatasets;
  };

}
