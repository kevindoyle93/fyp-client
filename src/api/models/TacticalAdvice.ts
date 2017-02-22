export class TacticalAdvice {
  title: string;
  message: string;
  drills: Array<string>;


  constructor(title: string, message: string, drills: Array<string>) {
    this.title = title;
    this.message = message;
    this.drills = drills;
  }
}
