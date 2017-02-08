import {Stat} from "./Stat";
export class Match {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  stats: Array<Stat>;
  fullTimeHomeGoals: number;
  fullTimeAwayGoals: number;
  halfTimeHomeGoals: number;
  halfTimeAwayGoals: number;
  homePossession: number;
  awayPossession: number;
  homeTotalShots: number;
  awayTotalShots: number;
  homeShotsOnTarget: number;
  awayShotsOnTarget: number;
  homeCorners: number;
  awayCorners: number;
  homeFouls: number;
  awayFouls: number;
  homeYellowCards: number;
  awayYellowCards: number;
  homeRedCards: number;
  awayRedCards: number;


  constructor(homeTeam: string, awayTeam: string, date: Date, fullTimeHomeGoals: number, fullTimeAwayGoals: number, halfTimeHomeGoals: number, halfTimeAwayGoals: number, homePossession: number, awayPossession: number, homeTotalShots: number, awayTotalShots: number, homeShotsOnTarget: number, awayShotsOnTarget: number, homeCorners: number, awayCorners: number, homeFouls: number, awayFouls: number, homeYellowCards: number, awayYellowCards: number, homeRedCards: number, awayRedCards: number) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.date = date;
    this.stats = [
      new Stat('Goals', '', fullTimeHomeGoals, fullTimeAwayGoals),
      new Stat('Half Time Goals', '', halfTimeHomeGoals, halfTimeAwayGoals),
      new Stat('Possession', '', homePossession, awayPossession),
      new Stat('Total Shots', '', homeTotalShots, awayTotalShots),
      new Stat('Shots on Target', '', homeShotsOnTarget, awayShotsOnTarget),
      new Stat('Corners', '', homeCorners, awayCorners),
      new Stat('Fouls', '', homeFouls, awayFouls),
      new Stat('Yelllow Cards', '', homeYellowCards, awayYellowCards),
      new Stat('Red Cards', '', homeRedCards, awayRedCards),
    ];
  }

  getDateString = () => {
    return this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
  };

  getStatsForNewMatch = () => {
    let matchStats = [];

    for(let i = 0; i < this.stats.length; i++) {
      if(this.stats[i].displayName.indexOf('Half') == -1 && this.stats[i].displayName.indexOf('Possession') == -1) {
        matchStats.push(this.stats[i]);
      }
    }

    return matchStats;
  }
}
