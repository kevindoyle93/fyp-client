import {Component, ViewChild} from '@angular/core';

import { LoadingController } from 'ionic-angular';
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

  tactics: Array<TacticalAdvice>;
  matches: Array<Match>;
  statsDatasets = [];

  loadingSpinner: any;

  constructor(public localStorage: LocalStorage, public loadCtrl: LoadingController) {
    this.fetchMatches();
    this.statsDatasets = this.createChartData(this.matches);
  }

  ionViewDidLoad() {
    this.loadingSpinner = this.loadCtrl.create({
      content: 'Creating stats charts...'
    });
    this.loadingSpinner.present().then(() => {
      for (let i = 0; i < this.statsDatasets.length; i++) {
        let canvas = document.getElementById(this.statsDatasets[i].element_id);
        new Chart(canvas, this.statsDatasets[i]);
      }
      this.loadingSpinner.dismiss();
    });
  }

  private fetchMatches = () => {
    this.matches = this.localStorage.getMatches();
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
          },
          animation: {
            duration: 0
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
          },
          animation: {
            duration: 0
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
