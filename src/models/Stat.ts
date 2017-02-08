export class Stat {
  displayName: string;
  apiName: string;
  homeValue: number;
  awayValue: number;

  constructor(displayName: string, apiName: string, homeValue: number, awayValue: number) {
    this.displayName = displayName;
    this.apiName = apiName;
    this.homeValue = homeValue;
    this.awayValue = awayValue;
  }
}
