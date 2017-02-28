import { Injectable } from '@angular/core';
import {TacticalAdvice} from "../models/TacticalAdvice";

@Injectable()
export class MockTacticalAdvice {

  public static TacticalAdviceArray = () => {
    return {
      results: [
        new TacticalAdvice('Increase Shots on Target', 'Rather than simply increasing the number of shots your team is taking, concentrate on improving the number of shots that hit the target. This could be acheived by practicing shooting to improve accuracy, or by moving the ball into better areas to shoot from.', ['Diagonal Layoff', '1 Touch Combinations', 'Supporting the Player with the Ball']),
        new TacticalAdvice('Decrease Yellow Cards', 'Players with early yellow cards must play more carefully for the rest of the match, potentially negatively effecting their performance. Practice more conservative tackling to decrease the chances of picking up yellow cards.', ['1 v 1 Defending', 'Shepherding Players Without Tackling']),
        new TacticalAdvice('Decrease Shots on Target Against', 'Decreasing your opponents shots on target by 2 would have increased the probability of a victory from 42% to 71%', ['1 v 1 Defending the Dribble', 'High Pressing'])
      ]
    };
  }

}
