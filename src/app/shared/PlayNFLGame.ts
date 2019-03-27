import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ISchedule, ITeam } from '../model/nfl.model';
import { calculateOdds } from '../common/odds';

export class PlayNFLGame {

  // Called by services (schedule.service and playoff.service)
  static playNFLGame(game: ISchedule, vTeam: ITeam, hTeam: ITeam, simFast: boolean): Observable<ISchedule> {
    // console.log('[PlayNFLGame] playNFLGame() started');

    const timeout = simFast ? 10 : 500;
    const subject = new Subject<ISchedule>();
    const gameCounter = 9;
    const gameMax = 11;
    const self = this;

    game.visitScore = 0;
    game.homeScore = 0;

    game.visitRecord = vTeam.wins + '-' + vTeam.losses;
    game.homeRecord = hTeam.wins + '-' + hTeam.losses;

    game.spread = calculateOdds(vTeam, hTeam);

    (function theLoop (i) {
      setTimeout(() => {
        let quarter = 'X';
        switch (i) {
          case 0: case 1: quarter = '1'; break;
          case 2: case 3: quarter = '2'; break;
          case 4: case 5: quarter = '3'; break;
          case 6: case 7: case 8: quarter = '4'; break;
          case 9: case 10: case 11: quarter = 'OT'; break;
          default: return 'U';
        }
        const score: number = self.generateNFLScore(self, game, vTeam, hTeam, i, quarter);
        // console.log('[PlayNFLGame] playNFLGame() score: ' + score);

        game.quarter = quarter;

        if (score > 0) {
          // console.log('[PlayNFLGame] playNFLGame() HOME scored: ' + score);
          game.homeScore += score;
          game.gameResults.push({ teamScored: game.homeTeam, quarter: quarter, points: score });
        }

        if (score < 0) {
          const vScore = (score * -1);
          // console.log('[PlayNFLGame] playNFLGame() VISIT scored: ' + vScore);
          game.visitScore += vScore;
          game.gameResults.push({ teamScored: game.visitTeam, quarter: quarter, points: vScore });
        }

        i++;
        if ((i < gameCounter) || ((i < gameMax) && (game.visitScore === game.homeScore))) {
          if (i >= gameCounter) {
            // console.log('[PlayNFLGame] playNFLGame() Game: ' + game.id + ' - OVERTIME! (' + gameCounter + ')');
          }
          theLoop(i);
        } else {
          if (game.visitScore === game.homeScore) {
            // console.log('[PlayNFLGame] playNFLGame() Game: ' + game.id + ' - FORECD OVERTIME!');
            game.homeScore += 3;
            game.gameResults.push({ teamScored: game.homeTeam, quarter: 'OT', points: 3 });
          }
          // console.log('[PlayNFLGame] playNFLGame() game over');
          subject.complete();
        }
      }, timeout);
    })(0);

    setTimeout(() => { subject.next(game); }, 0);
    return subject;
  }

  // Called internally by playNFLGame
  static generateNFLScore(self: any, game: ISchedule, vTeam: ITeam, hTeam: ITeam, gameCounter: number, quarter: string): number {
    // console.log('[PlayNFLGame] generateNFLScore() gameCounter: ' + gameCounter);

    switch (gameCounter) {
      case 0: return this.determineScore (self, game.homeScore, hTeam.qb, game.visitScore, vTeam.qb, quarter);
      case 1: return this.determineScore (self, game.homeScore, hTeam.rb, game.visitScore, vTeam.lb, quarter);
      case 2: return this.determineScore (self, game.homeScore, hTeam.wr, game.visitScore, vTeam.db, quarter);
      case 3: return this.determineScore (self, game.homeScore, hTeam.ol, game.visitScore, vTeam.dl, quarter);
      case 4: return this.determineScore (self, game.homeScore, hTeam.dl, game.visitScore, vTeam.ol, quarter);
      case 5: return this.determineScore (self, game.homeScore, hTeam.lb, game.visitScore, vTeam.rb, quarter);
      case 6: return this.determineScore (self, game.homeScore, hTeam.db, game.visitScore, vTeam.wr, quarter);
      case 7: return this.determineScore (self, game.homeScore, hTeam.st, game.visitScore, vTeam.st, quarter);
      case 8: return this.determineScore (self, game.homeScore, hTeam.co, game.visitScore, vTeam.co, quarter);
      case 9: return this.determineScore (self, game.homeScore, hTeam.qb, game.visitScore, vTeam.qb, quarter);
      case 10: return this.determineScore (self, game.homeScore, hTeam.co, game.visitScore, vTeam.co, quarter);
      case 11: return 3;
      default: console.log('generateNFLScore() Error - Invalid gameCounter: ' + gameCounter);
    }
  }

  // Called internally by generateNFLScore
  static determineScore(self: any, homeScore: number, homeAttrib: number,
      visitScore: number, visitAttrib: number, quarter: string): number {

    let points = 0;
    let difference = 0;
    const currHomeScore = homeScore;
    const currVisitScore = visitScore;

    // console.log('[PlayNFLGame] determineScore() homeAttrib: ' + homeAttrib +  ', visitAttrib: ' + visitAttrib);
    homeAttrib -= 3;
    visitAttrib -= 3;

    const Try1 = (homeAttrib <= 0) ? 0 : Math.floor(Math.random() * homeAttrib);
    const Try2 = (visitAttrib <= 0) ? 0 : Math.floor(Math.random() * visitAttrib);
    // console.log('[PlayNFLGame] determineScore() Try1: ' + Try1 +  ', Try2: ' + Try2);

    if (Try1 !== Try2) {
      difference = Math.abs(Try1 - Try2);
      // console.log('[PlayNFLGame] determineScore() difference: ' + difference);
      if (difference >= 3) {
        points = self.makePoints(8);
      } else {
        points = self.makePoints(5);
      }
      // console.log('[PlayNFLGame] determineScore() points: ' + points);

      if (Try1 > Try2) {
        if (quarter === 'OT') {
          if (points > 3) {
            points = 7;
          }
        } else {
          if (points === 6) {
            if (quarter >= '3') {
              points += self.xtraPt(self, currHomeScore, currVisitScore, 'Home', quarter);
            } else {
              points += self.goFor(1);
            }
          }
        }
        return points;
      } else {
        if (quarter === 'OT') {
          if (points > 3) {
            points = 7;
          }
        } else {
          if (points === 6) {
            if (quarter >= '3') {
              points += self.xtraPt(self, currHomeScore, currVisitScore, 'Visit', quarter);
            } else {
              points += self.goFor(1);
            }
          }
        }
        return (points * -1);
      }
    }

    return 0;
  }

  // Called internally by determineScore
  static makePoints (number) {
    const rand = Math.floor(Math.random() * number);
    if (rand % 2 === 1) {
      // console.log('[PlayNFLGame] makePoints() returning 3');
      return 3;
    } else {
      // console.log('[PlayNFLGame] makePoints() returning 6');
      return 6;
    }
  }

  // Called internally by determineScore
  static xtraPt (self: any, homeScore: number, visitScore: number, scorer: string) {
    // console.log('[PlayNFLGame] xtraPt() Attempting');
    let difference = 0;
    let soFar = '';
    let xtra = 0;

    if (scorer === 'Home') {
      difference = ((homeScore + 6) - visitScore);
      if (difference > 0) {
        soFar = 'winning';
      }
      if (difference < 0) {
        soFar = 'losing';
      }
    }
    if (scorer === 'Visit') {
      difference = (homeScore - (visitScore + 6));
      if (difference > 0) {
        soFar = 'losing';
      }
      if (difference < 0) {
        soFar = 'winning';
      }
    }
    if (difference === 0) {
      // go for 1
      xtra = self.goFor(1);
      return xtra;
    }
    if (soFar === 'winning') {
      switch (Math.abs(difference)) {
        case  1: xtra = self.goFor(2); break;
        case  2: xtra = self.goFor(1); break;
        case  3: xtra = self.goFor(1); break;
        case  4: xtra = self.goFor(1); break;
        case  5: xtra = self.goFor(2); break;
        case  6: xtra = self.goFor(1); break;
        case  7: xtra = self.goFor(1); break;
        case  8: xtra = self.goFor(1); break;
        case  9: xtra = self.goFor(1); break;
        case 10: xtra = self.goFor(1); break;
        case 11: xtra = self.goFor(1); break;
        case 12: xtra = self.goFor(2); break;
        case 13: xtra = self.goFor(1); break;
        case 14: xtra = self.goFor(1); break;
        case 15: xtra = self.goFor(2); break;
        case 16: xtra = self.goFor(1); break;
        case 17: xtra = self.goFor(1); break;
        case 18: xtra = self.goFor(1); break;
        case 19: xtra = self.goFor(2); break;
        case 20: xtra = self.goFor(1); break;
        default: xtra = self.goFor(1);
      }
      return xtra;
    }
    if (soFar === 'losing') {
      switch (Math.abs(difference)) {
        case  1: xtra = self.goFor(1); break;
        case  2: xtra = self.goFor(2); break;
        case  3: xtra = self.goFor(1); break;
        case  4: xtra = self.goFor(1); break;
        case  5: xtra = self.goFor(2); break;
        case  6: xtra = self.goFor(1); break;
        case  7: xtra = self.goFor(1); break;
        case  8: xtra = self.goFor(1); break;
        case  9: xtra = self.goFor(2); break;
        case 10: xtra = self.goFor(2); break;
        case 11: xtra = self.goFor(1); break;
        case 12: xtra = self.goFor(2); break;
        case 13: xtra = self.goFor(1); break;
        case 14: xtra = self.goFor(1); break;
        case 15: xtra = self.goFor(1); break;
        case 16: xtra = self.goFor(2); break;
        case 17: xtra = self.goFor(1); break;
        case 18: xtra = self.goFor(1); break;
        case 19: xtra = self.goFor(2); break;
        case 20: xtra = self.goFor(1); break;
        default: xtra = self.goFor(1);
      }
      return xtra;
    }
  }

  // Called internally by xtraPt
  static goFor (attempt: number) {
    // console.log('[PlayNFLGame] goFor(' + attempt + ')');
    const rand = Math.floor(Math.random() * 100) + 1;

    if (attempt === 1) {
      return (rand > 94) ? 0 : attempt;
    }
    if (attempt === 2) {
      return (rand > 60) ? 0 : attempt;
    }
  }
}
