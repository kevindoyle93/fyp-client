export class TacticalAdvice {
  title: string;
  feature: string;
  improvement: string;
  message: string;
  drills: Array<any>;


  constructor(title: string, feature: string, improvement: string, message: string, drills: Array<string>) {
    this.title = title;
    this.feature = feature;
    this.improvement = improvement;
    this.message = message;
    this.drills = drills;
  }
}
