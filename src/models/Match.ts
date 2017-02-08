export class Match {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  fullTimeHomeGoals: number;
  fullTimeAwayGoals: number;
  halfTimeHomeGoals: number;
  halfTimeAwayGoals: number;
  homePossession: number;
  awayPossession: number;
  homeTotalShots: number;
  awayTotalShots: number;
  homeCorners: number;
  awayCorners: number;
  homeFouls: number;
  awayFouls: number;
  homeYellowCards: number;
  awayYellowCards: number;
  homeRedCards: number;
  awayRedCards: number;

  constructor(homeTeam: string, awayTeam: string, fullTimeHomeScore: number, fullTimeAwayScore: number, date: Date) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.fullTimeHomeGoals = fullTimeHomeScore;
    this.fullTimeAwayGoals = fullTimeAwayScore;
    this.date = date;
  }

  getDateString = () => {
    return this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
  }
}