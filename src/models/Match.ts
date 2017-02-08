export class Match {
  homeTeam: string;
  awayTeam: string;
  fullTimeHomeGoals: number;
  fullTimeAwayGoals: number;
  date: Date;

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
