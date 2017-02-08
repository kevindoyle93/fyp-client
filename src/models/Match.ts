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
    this.fullTimeHomeGoals = fullTimeHomeGoals;
    this.fullTimeAwayGoals = fullTimeAwayGoals;
    this.halfTimeHomeGoals = halfTimeHomeGoals;
    this.halfTimeAwayGoals = halfTimeAwayGoals;
    this.homePossession = homePossession;
    this.awayPossession = awayPossession;
    this.homeTotalShots = homeTotalShots;
    this.awayTotalShots = awayTotalShots;
    this.homeShotsOnTarget = homeShotsOnTarget;
    this.awayShotsOnTarget = awayShotsOnTarget;
    this.homeCorners = homeCorners;
    this.awayCorners = awayCorners;
    this.homeFouls = homeFouls;
    this.awayFouls = awayFouls;
    this.homeYellowCards = homeYellowCards;
    this.awayYellowCards = awayYellowCards;
    this.homeRedCards = homeRedCards;
    this.awayRedCards = awayRedCards;
  }

  getDateString = () => {
    return this.date.getDate() + '/' + this.date.getMonth() + '/' + this.date.getFullYear();
  };

  formatStats = () => {
    return [
      {home: '' + this.homePossession + '%', name: 'Possession', away: '' + this.awayPossession + '%'},
      {home: this.homeTotalShots, name: 'Total Shots', away: this.awayTotalShots},
      {home: this.homeShotsOnTarget, name: 'Shots on Target', away: this.awayShotsOnTarget},
      {home: this.homeCorners, name: 'Corners', away: this.awayCorners},
      {home: this.homeFouls, name: 'Fouls', away: this.awayFouls},
      {home: this.homeYellowCards, name: 'Yellow Cards', away: this.awayYellowCards},
      {home: this.homeRedCards, name: 'Red Cards', away: this.awayRedCards},
    ]
  };
}
