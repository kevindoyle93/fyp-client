export class TacticalAdvice {
  title: string;
  improvement: string;
  message: string;
  drills: Array<any>;


  constructor(title: string, improvement: string, message: string, drills: Array<string>) {
    this.title = title;
    this.improvement = improvement;
    this.message = message;
    this.drills = drills;
  }
}
