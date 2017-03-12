import {Stat} from "./Stat";
export class Match {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  stats: Array<Stat>;

  userTeamIsHomeTeam: boolean;


  static createBlank() {
    return new Match('', '', new Date(), 0, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  constructor(homeTeam: string, awayTeam: string, date: Date, fullTimeHomeGoals: number, fullTimeAwayGoals: number, halfTimeHomeGoals: number, halfTimeAwayGoals: number, homePossession: number, awayPossession: number, homeTotalShots: number, awayTotalShots: number, homeShotsOnTarget: number, awayShotsOnTarget: number, homeCorners: number, awayCorners: number, homeFouls: number, awayFouls: number, homeYellowCards: number, awayYellowCards: number, homeRedCards: number, awayRedCards: number) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.date = date;
    this.stats = [
      new Stat('Goals', 'full_time_goals', fullTimeHomeGoals, fullTimeAwayGoals),
      new Stat('Half Time Goals', 'half_time_goals', halfTimeHomeGoals, halfTimeAwayGoals),
      new Stat('Possession', 'possession', homePossession, awayPossession),
      new Stat('Total Shots', 'total_shots', homeTotalShots, awayTotalShots),
      new Stat('Shots on Target', 'shots_on_target', homeShotsOnTarget, awayShotsOnTarget),
      new Stat('Corners', 'corners', homeCorners, awayCorners),
      new Stat('Fouls', 'fouls', homeFouls, awayFouls),
      new Stat('Yellow Cards', 'yellow_cards', homeYellowCards, awayYellowCards),
      new Stat('Red Cards', 'red_cards', homeRedCards, awayRedCards),
    ];
  }

  getDateString = () => {
    return this.date.getDate() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();
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

  static convertMatchForBackend = (match: Match, userTeamIsHomeTeam: boolean) => {
    let formatted_match = {};
    if (userTeamIsHomeTeam) {
      formatted_match['at_home'] = true;
      formatted_match['winning_at_half_time'] = match.stats[1].homeValue > match.stats[1].awayValue;

      for (let i = 0; i <  match.stats.length; i++) {
        let stat: Stat = match.stats[i];
        formatted_match[stat.apiName] = match.stats[i].homeValue;
        formatted_match['opp_' + stat.apiName] = match.stats[i].awayValue;
      }

      return formatted_match;

    } else {
      formatted_match['at_home'] = false;
      formatted_match['winning_at_half_time'] = match.stats[1].awayValue > match.stats[1].homeValue;

      for (let i = 0; i <  match.stats.length; i++) {
        let stat: Stat = match.stats[i];
        formatted_match[stat.apiName] = match.stats[i].awayValue;
        formatted_match['opp_' + stat.apiName] = match.stats[i].homeValue;
      }

      return formatted_match;
    }
  };
}
