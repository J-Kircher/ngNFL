import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ISchedule } from '../model/nfl.model';

export class PlayFakeGame {

  // Called internally by playFakeGame
  static generateFakeScore(): number {
    // console.log('[PlayFakeGame] generateFakeScore()');
    const scoreArr = [7, 0, 7, 0, 7, 0, 7, 0, 3, 3, 0, 0, 3, 3, 0, 7, 0, 7, 0, 7, 0, 7];
    const rndIndex = Math.floor(Math.random() * scoreArr.length);
    return scoreArr[rndIndex];
  }

  // Called by services (schedule.service and playoff.service)
  static playFakeGame(game: ISchedule, simFast: boolean): Observable<ISchedule> {
    console.log('[PlayFakeGame] playFakeGame() started');

    const timeout = simFast ? 10 : 500;
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

  // generateFakeFinalScore(oppScore: number): number {
  //   // console.log('[schedule.service] generateFakeFinalScore(' + oppScore + ')');
  //   const scoreArr = [3, 7, 10, 13, 14, 17, 20, 21, 23, 24, 27, 28, 30, 31, 34, 35];
  //   const rndIndex = Math.floor(Math.random() * scoreArr.length);
  //   return scoreArr[rndIndex] !== oppScore ? scoreArr[rndIndex] : this.generateFakeFinalScore(scoreArr[rndIndex]);
  // }

  // playFastGame(game: ISchedule) {
  //   console.log('[schedule.service] playFastGame() currentGame: ' + this.currentGame);
  //   const visitTeam = this.teamService.getTeamByIndex(game.visitTeam);
  //   const homeTeam = this.teamService.getTeamByIndex(game.homeTeam);

  //   game.visitScore = this.generateFakeFinalScore(0);
  //   game.homeScore = this.generateFakeFinalScore(game.visitScore);
  //   game.quarter = 'F';

  //   if (game.visitScore > game.homeScore) {
  //     visitTeam.wins++;
  //     visitTeam.visitwins++;
  //     homeTeam.losses++;
  //     homeTeam.homelosses++;
  //     if (visitTeam.division.substr(0, 3) === homeTeam.division.substr(0, 3)) {
  //       visitTeam.confwins++;
  //       homeTeam.conflosses++;
  //       if (visitTeam.division === homeTeam.division) {
  //         visitTeam.divwins++;
  //         homeTeam.divlosses++;
  //       }
  //     } else {
  //       visitTeam.othwins++;
  //       homeTeam.othlosses++;
  //     }
  //   } else {
  //     visitTeam.losses++;
  //     visitTeam.visitlosses++;
  //     homeTeam.wins++;
  //     homeTeam.homewins++;
  //     if (visitTeam.division.substr(0, 3) === homeTeam.division.substr(0, 3)) {
  //       visitTeam.conflosses++;
  //       homeTeam.confwins++;
  //       if (visitTeam.division === homeTeam.division) {
  //         visitTeam.divlosses++;
  //         homeTeam.divwins++;
  //       }
  //     } else {
  //       visitTeam.othlosses++;
  //       homeTeam.othwins++;
  //     }
  //   }

  //   visitTeam.pct = this.getPCT(visitTeam);
  //   visitTeam.pf += game.visitScore;
  //   visitTeam.pa += game.homeScore;
  //   homeTeam.pct = this.getPCT(homeTeam);
  //   homeTeam.pf += game.homeScore;
  //   homeTeam.pa += game.visitScore;

  //   this.storageService.storeScheduleToLocalStorage(this.FULL_SCHEDULE);

  //   // this.storageService.storeTeamsToLocalStorage(this.teamService.getAllCurrentTeams());
  //   this.teamService.getAllCurrentTeams().subscribe((teamData: ITeam[]) => {
  //     this.storageService.storeTeamsToLocalStorage(teamData);
  //   }, (err) => {
  //     console.error('[schedule.service] playFastGame() getAllCurrentTeams() error: ' + err);
  //   });
  // }
}
