import {Injectable} from '@angular/core';
import {Match} from "../api/models/Match";

@Injectable()
export class LocalStorage {

  constructor() {

  }

  set = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  get = (key: string) => {
    return JSON.parse(window.localStorage.getItem(key));
  };

  addNewMatch = (match: Match) => {
    let matches = this.get('matches');
    if (matches == null) {
      matches = [];
    }

    matches.push(match);
    this.set('matches', matches);
  };

  clearMatches = () => {
    this.set('matches', null);
  };

  getMatches = () => {
    let matches = [];
    let matchesJson: any = this.get('matches');

    if (matchesJson == null) {
      return matches;
    }

    for (let i = 0; i < matchesJson.length; i++) {
      let m: any = matchesJson[i];
      let match = new Match(
        m.homeTeam,
        m.awayTeam,
        new Date(m.date),
        m.stats[0].homeValue,
        m.stats[0].awayValue,
        m.stats[1].homeValue,
        m.stats[1].awayValue,
        m.stats[2].homeValue,
        m.stats[2].awayValue,
        m.stats[3].homeValue,
        m.stats[3].awayValue,
        m.stats[4].homeValue,
        m.stats[4].awayValue,
        m.stats[5].homeValue,
        m.stats[5].awayValue,
        m.stats[6].homeValue,
        m.stats[6].awayValue,
        m.stats[7].homeValue,
        m.stats[7].awayValue,
        m.stats[8].homeValue,
        m.stats[8].awayValue,
      );
      match.coachTeamIsHomeTeam = m['coachTeamIsHomeTeam'];
      matches.push(match);
    }

    return matches.sort((match1, match2) => match2.date - match1.date);
  };

  setToken = (token: string) => {
    this.set('token', token);
  };

  getToken = () => {
    return this.get('token');
  };

}
