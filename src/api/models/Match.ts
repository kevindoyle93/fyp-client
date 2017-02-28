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


  static createBlank() {
    return new Match('', '', new Date(), 0, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

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

  getIntegerCountStats = () => {
    let matchStats = [];

    for(let i = 0; i < this.stats.length; i++) {
      if(this.stats[i].displayName.indexOf('Half') == -1 && this.stats[i].displayName.indexOf('Possession') == -1) {
        matchStats.push(this.stats[i]);
      }
    }

    return matchStats;
  };

  static testApi() {
    return {
      at_home: true,
      winning_at_half_time: true,
      half_time_goals: 1,
      opp_half_time_goals: 0,
      possession: 51.7,
      opp_possession: 48.3,
      total_shots: 12,
      opp_total_shots: 8,
      shots_on_target: 6,
      opp_shots_on_target: 5,
      corners: 4,
      opp_corners: 3,
      fouls: 9,
      opp_fouls: 10,
      yellow_cards: 2,
      opp_yellow_cards: 1,
      red_cards: 0,
      opp_red_cards: 0
    }
  }
}
