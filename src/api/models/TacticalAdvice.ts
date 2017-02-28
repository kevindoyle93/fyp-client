export class TacticalAdvice {
  title: string;
  message: string;
  drills: Array<any>;


  constructor(title: string, message: string, drills: Array<string>) {
    this.title = title;
    this.message = message;
    this.drills = drills;
  }
}
