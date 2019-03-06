import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ISchedule } from '../model/nfl.model';

export class PlayFakeGame {

  static generateFakeScore(): number {
    // console.log('[PlayFakeGame] generateFakeScore()');
    const scoreArr = [7, 0, 7, 0, 7, 0, 7, 0, 3, 3, 0, 0, 3, 3, 0, 7, 0, 7, 0, 7, 0, 7];
    const rndIndex = Math.floor(Math.random() * scoreArr.length);
    return scoreArr[rndIndex];
  }

  static playFakeGame(game: ISchedule, simFast: boolean): Observable<ISchedule> {
    console.log('[PlayFakeGame] playFakeGame() started');

    const timeout = simFast ? 50 : 500;
    const subject = new Subject<ISchedule>();
    const gameCounter = 16;
    const self = this;

    game.visitScore = 0;
    game.homeScore = 0;

    (function theLoop (i) {
      setTimeout(() => {
        const score: number = self.generateFakeScore();

        let quarter = 'X';
        switch (i) {
          case 0: case 1: case 2: case 3: quarter = '1'; break;
          case 4: case 5: case 6: case 7: quarter = '2'; break;
          case 8: case 9: case 10: case 11: quarter = '3'; break;
          case 12: case 13: case 14: case 15: quarter = '4'; break;
          default: return 'U';
        }

        game.quarter = quarter;

        if (score > 0) {
          if ((i % 2) > 0) {
            // visit
            game.visitScore += score;
            game.gameResults.push({ teamScored: game.visitTeam, quarter: quarter, points: score });
          } else {
            // home
            game.homeScore += score;
            game.gameResults.push({ teamScored: game.homeTeam, quarter: quarter, points: score });
          }
        }

        if (++i < gameCounter) {
          theLoop(i);
        } else {
          if (game.visitScore === game.homeScore) {
            game.homeScore += 3;
            game.gameResults.push({ teamScored: game.homeTeam, quarter: 'OT', points: 3 });
          }
          console.log('[PlayFakeGame] playFakeGame() game over');
          subject.complete();
        }
      }, timeout);
    })(0);

    setTimeout(() => { subject.next(game); }, 0);
    return subject;
  }
}
