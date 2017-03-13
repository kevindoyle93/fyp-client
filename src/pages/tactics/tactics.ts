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
  statsDatasets = [];

  constructor(public navCtrl: NavController, public localStorage: LocalStorage) {
    this.fetchTactics();
    this.fetchMatches();
    this.statsDatasets = this.createChartData(this.matches);
  }

  ionViewDidLoad() {
    for (let i = 0; i < this.statsDatasets.length; i++) {
      let canvas = document.getElementById(this.statsDatasets[i].element_id);
      new Chart(canvas, this.statsDatasets[i]);
    }
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
        title: matches[0].stats[i].displayName,
        element_id: matches[0].stats[i].apiName,
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

      statsDatasets.push({
        title: 'Opposition ' + matches[0].stats[i].displayName,
        element_id: 'opp_' + matches[0].stats[i].apiName,
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: 'rgba(175, 80, 76, 0.4)'
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

      let stats = Object.keys(m);

      // The first two starts aren't displayed
      for (let j = 0; j < stats.length - 2; j++) {
        statsDatasets[j].data.labels.push('');
        statsDatasets[j].data.datasets[0].data.push(m[stats[j + 2]]);
      }

    }

    return statsDatasets;
  };

}
