import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISchedule, IScheduleBase, ITeam, IGameResults } from '../model/nfl.model';
import { TeamService } from '../service/team.service';
import { sortDivision, sortConference } from '../common/sort';

const SCHEDULE: IScheduleBase[] = [
  {'gameday': 'Wildcard Weekend', 'games': [4, 3, 10, 9, 5, 2, 11, 8]},
  {'gameday': 'Division Championship', 'games': [3, 0, 9, 6, 2, 1, 8, 7]},
  {'gameday': 'Conference Championship', 'games': [1, 0, 7, 6]},
  {'gameday': 'Super Bowl', 'games': [6, 0]}
];

@Injectable()
export class PlayoffService {
  PLAYOFF_SCHEDULE: ISchedule[] = [];
  aGameDay: string[] = [];
  currentPlayoffGame: number = 0;
  currentPlayoffGameDay: string;
  AFCPlayoffTeams: number[] = [];
  NFCPlayoffTeams: number[] = [];
  PlayoffTeams: number[] = [];
  SuperBowlChamp: number;

  // Observable sources
  private currentPlayoffGameSource = new BehaviorSubject<number>(0);
  private currentPlayoffGameDaySource = new BehaviorSubject<string>('');

  // Observable streams
  currentPlayoffGame$ = this.currentPlayoffGameSource.asObservable();
  currentPlayoffGameDay$ = this.currentPlayoffGameDaySource.asObservable();

  constructor(
    private teamService: TeamService
  ) { }

  // Service message commands
  setCurrentPlayoffGame(data: number) {
    // console.log('[playoff.service] setPlayoffcurrentPlayoffGame() data: ' + data);
    this.currentPlayoffGameSource.next(data);
  }
  setCurrentPlayoffGameDay(data: string) {
    // console.log('[playoff.service] setPlayoffcurrentPlayoffGameDay() data: ' + data);
    this.currentPlayoffGameDaySource.next(data);
  }

  buildPlayoffSchedule(playoffDay: string) {
    console.log('[playoff-service] buildPlayoffSchedule() playoffDay: ' + playoffDay);
    let counter: number = 0;
    SCHEDULE.forEach(day => {
      for (let i = 0; i < day.games.length; i++) {
        const currentPlayoffGame: ISchedule = {
          id: counter++,
          gameday: day.gameday,
          visitTeam: this.PlayoffTeams[day.games[i]],
          visitScore: null,
          homeTeam: this.PlayoffTeams[day.games[i + 1]],
          homeScore: null,
          quarter: null,
          gameResults: []
        };
        if (currentPlayoffGame.gameday === playoffDay) {
          this.PLAYOFF_SCHEDULE.push(currentPlayoffGame);
        }
        i++;
      }
    });
    this.currentPlayoffGameDay = this.PLAYOFF_SCHEDULE[this.currentPlayoffGame].gameday;
    this.setCurrentPlayoffGameDay(this.currentPlayoffGameDay);

    console.log('[playoff-service] PLAYOFF_SCHEDULE:');
    console.log(this.PLAYOFF_SCHEDULE);
  }

  getGamesForDay(searchTerm: string): ISchedule[] {
    // console.log('[playoff.service] getGamesForDay() searchTerm: ' + searchTerm);
    return this.PLAYOFF_SCHEDULE.filter(day => day.gameday === searchTerm);
  }

  hasGamesForDay(searchTerm: string): boolean {
    let games: ISchedule[] = [];
    games = this.PLAYOFF_SCHEDULE.filter(day => day.gameday === searchTerm);
    return games.length > 0 ? true : false;
  }

  getGamesForTeam(team: number): ISchedule[] {
    // console.log('[playoff-service] getGamesForTeam() team: ' + team);
    return this.PLAYOFF_SCHEDULE.filter(game => ((game.visitTeam === team) || (game.homeTeam === team)));
  }

  getGameById(id: number): ISchedule {
    return this.PLAYOFF_SCHEDULE.find(game => game.id === id);
  }




  getGameResults(id: number): Observable<IGameResults[]> {
    const subject = new Subject<IGameResults[]>();

    setTimeout(() => {subject.next(this.PLAYOFF_SCHEDULE.find(game => (game.id === id)).gameResults); subject.complete(); }, 0);
    return subject;
  }

  generateFakeScore(): number {
    // console.log('[schedule.service] generateFakeScore()');
    const scoreArr = [7, 0, 7, 0, 7, 0, 7, 0, 3, 3, 0, 0, 3, 3, 0, 7, 0, 7, 0, 7, 0, 7];
    const rndIndex = Math.floor(Math.random() * scoreArr.length);
    return scoreArr[rndIndex];
  }

  playFakeGame(game: ISchedule, simFast: boolean): Observable<ISchedule> {
    console.log('[schedule.service] playFakeGame() started');

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
          console.log('[schedule.service] playFakeGame() game over');
          subject.complete();
        }
      }, timeout);
    })(0);

    setTimeout(() => { subject.next(game); }, 0);
    return subject;
  }

  playGame(game: ISchedule, simFast: boolean) {
    console.log('[playoff.service] playGame() currentPlayoffGame: ' + this.currentPlayoffGame);
    const visitTeam = this.teamService.getTeamByIndex(game.visitTeam);
    const homeTeam = this.teamService.getTeamByIndex(game.homeTeam);

    this.playFakeGame(game, simFast).subscribe((gameData: ISchedule) => {
      console.log('[playoff.service] playGame() playing Game');
      game = gameData;
    }, (err) => {
      console.error('[playoff.service] playGame() playFakeGame error: ' + err);
    }, () => {
      console.log('[playoff.service] playGame() playFakeGame over');
      game.quarter = 'F';
      if (game.visitScore > game.homeScore) {
        console.log('[playoff.service] playGame() Visitors Win');
        // Update playoffs teams array
      } else {
        console.log('[playoff.service] playGame() Home Wins');
        // Update playoffs teams array
      }

      // this.storageService.storeScheduleToLocalStorage(this.PLAYOFF_SCHEDULE);
    });
  }

  playPlayoffGame() {
    // console.log('[playoff-service] playNextGame() curr:' + this.currentPlayoffGame + ' len:' + this.PLAYOFF_SCHEDULE.length);
    const simFast = false;
    if (this.currentPlayoffGame < this.PLAYOFF_SCHEDULE.length) {
      this.setCurrentPlayoffGame(this.currentPlayoffGame);

      this.currentPlayoffGameDay = this.PLAYOFF_SCHEDULE[this.currentPlayoffGame].gameday;
      // console.log('[playoff-service] playNextGame() currentPlayoffGameDay: ' + this.currentPlayoffGameDay);
      this.setCurrentPlayoffGameDay(this.currentPlayoffGameDay);

      this.playGame(this.PLAYOFF_SCHEDULE[this.currentPlayoffGame], simFast);
      this.currentPlayoffGame++;
      // return true;
    } else {
      console.log('[playoff-service] playNextGame() Season Over');
      // return false;
    }
  }

  initPlayoffs() {
    if (this.PLAYOFF_SCHEDULE.length > 0) {
      console.log('[playoff.service] initPlayoffs() Playoff schedule built');
    } else {
      console.log('[playoff.service] initPlayoffs() Building playoff schedule');
      this.aGameDay = SCHEDULE.map(s => s.gameday);
      this.buildPlayoffSchedule(this.aGameDay[0]);
    }
  }




  getPlayoffTeams(): Observable<number[]> {
    const subject = new Subject<number[]>();

    if (this.PlayoffTeams.length) {
      // console.log('[playoff.service] getPlayoffTeams() PlayoffTeams already BUILT');
    } else {
      console.log('[playoff.service] getPlayoffTeams() Need to build Playoff Teams');
      this.getAFCPlayoffTeams();
      this.getNFCPlayoffTeams();
      setTimeout(() => {
        this.PlayoffTeams = this.AFCPlayoffTeams.concat(this.NFCPlayoffTeams);
      }, 0);
    }

    setTimeout(() => { subject.next(this.PlayoffTeams); subject.complete(); }, 0);
    return subject;
  }

  getAFCPlayoffTeams() {
    if (this.NFCPlayoffTeams.length) {
      console.log('[playoff.service] getAFCPlayoffTeams() AFCPlayoffTeams already BUILT');
    } else {
      console.log('[playoff.service] getAFCPlayoffTeams() Need to build AFCPlayoffTeams');
      const divisions: string[] = [];
      let teamsArr: ITeam[] = [];
      const AFCDivLeaders: ITeam [] = [];
      const AFCOthers: ITeam [] = [];

      this.AFCPlayoffTeams = [];

      this.teamService.getAllCurrentTeams().subscribe((data: ITeam[]) => {
        teamsArr = data;
        // console.log('[playoffs.service-afc] ngOnInit() getAllCurrentTeams() SUCCESS');

        teamsArr.forEach(team => {
          if (divisions.indexOf(team.division) < 0) {
            divisions.push(team.division);
          }
        });

        divisions
          .filter(division => division.indexOf('AFC') > -1 )
          .forEach(division => {
            const thisDiv: ITeam[] = teamsArr.filter(team => (team.division === division));
            thisDiv.sort(sortDivision);
            AFCDivLeaders.push(thisDiv[0]);
            AFCOthers.push(thisDiv[1]);
            AFCOthers.push(thisDiv[2]);
            AFCOthers.push(thisDiv[3]);
          });

        AFCDivLeaders.sort(sortConference);
        AFCOthers.sort(sortConference);

        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[0].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[1].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[2].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCDivLeaders[3].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCOthers[0].abbrev));
        this.AFCPlayoffTeams.push(this.teamService.getTeamIndex(AFCOthers[1].abbrev));
        // console.table(this.AFCPlayoffTeams);

      });
    }
  }

  getNFCPlayoffTeams() {
    if (this.NFCPlayoffTeams.length) {
      console.log('[playoff.service] getNFCPlayoffTeams() NFCPlayoffTeams already BUILT');
    } else {
      console.log('[playoff.service] getNFCPlayoffTeams() Need to build NFCPlayoffTeams');
      const divisions: string[] = [];
      let teamsArr: ITeam[] = [];
      const NFCDivLeaders: ITeam [] = [];
      const NFCOthers: ITeam [] = [];

      this.NFCPlayoffTeams = [];

      this.teamService.getAllCurrentTeams().subscribe((data: ITeam[]) => {
        teamsArr = data;
        // console.log('[playoffs.service-nfc] ngOnInit() getAllCurrentTeams() SUCCESS');

        teamsArr.forEach(team => {
          if (divisions.indexOf(team.division) < 0) {
            divisions.push(team.division);
          }
        });

        divisions
          .filter(division => division.indexOf('NFC') > -1 )
          .forEach(division => {
            const thisDiv: ITeam[] = teamsArr.filter(team => (team.division === division));
            thisDiv.sort(sortDivision);
            NFCDivLeaders.push(thisDiv[0]);
            NFCOthers.push(thisDiv[1]);
            NFCOthers.push(thisDiv[2]);
            NFCOthers.push(thisDiv[3]);
          });

        NFCDivLeaders.sort(sortConference);
        NFCOthers.sort(sortConference);

        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[0].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[1].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[2].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCDivLeaders[3].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCOthers[0].abbrev));
        this.NFCPlayoffTeams.push(this.teamService.getTeamIndex(NFCOthers[1].abbrev));
        // console.table(this.NFCPlayoffTeams);

      });
    }
  }

  resetPlayoffs() {
    console.log('[playoff.service] resetPlayoffs() Playoffs RESET!');
    this.PLAYOFF_SCHEDULE = [];
    this.currentPlayoffGame = 0;
    this.currentPlayoffGameDay = '';
    this.AFCPlayoffTeams = [];
    this.NFCPlayoffTeams = [];
    this.PlayoffTeams = [];
    this.SuperBowlChamp = 0;
  }
}
