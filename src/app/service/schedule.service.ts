import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { ISchedule, IScheduleBase, ITeam, IGameResults } from '@app/model/nfl.model';
import { TeamService } from '@app/service/team.service';
import { GameService } from '@app/service/game.service';
import { StorageService } from '@app/service/storage.service';
import { PlayNFLGame } from '@app/shared/PlayNFLGame';

import { _SCHEDULE } from '@app/shared/NFLSchedule2025';

@Injectable()
export class ScheduleService {
  FULL_SCHEDULE: ISchedule[];
  currentGame: number = 0;
  currentGameDay: string;
  endOfSeason: boolean = false;
  finalGame: number;
  private SCHEDULE: IScheduleBase[] = [];

  // Observable sources
  private currentGameSource = new BehaviorSubject<number>(0);
  private currentGameDaySource = new BehaviorSubject<string>('');
  private endOfSeasonSource = new BehaviorSubject<boolean>(false);
  private finalGameSource = new BehaviorSubject<number>(0);

  // Observable streams
  currentGame$ = this.currentGameSource.asObservable();
  currentGameDay$ = this.currentGameDaySource.asObservable();
  endOfSeason$ = this.endOfSeasonSource.asObservable();
  finalGame$ = this.finalGameSource.asObservable();

  constructor(
    private teamService: TeamService,
    private gameService: GameService,
    private storageService: StorageService
  ) { }

  // {'gameday': 'Monday, September 11', 'games': [26, 23, 14, 12]},

  // Service message commands
  setCurrentGame(data: number) {
    // console.log('[schedule.service] setCurrentGame() data: ' + data);
    this.currentGameSource.next(data);
  }
  setCurrentGameDay(data: string) {
    // console.log('[schedule.service] setCurrentGameDay() data: ' + data);
    this.currentGameDaySource.next(data);
  }
  setEndOfSeason(data: boolean) {
    // console.log('[schedule.service] setEndOfSeason() data: ' + data);
    this.endOfSeasonSource.next(data);
  }
  setFinalGame(data: number) {
    // console.log('[schedule.service] setFinalGame() data: ' + data);
    this.finalGameSource.next(data);
  }

  loadScheduleFromStorage() {
    this.currentGame = 0;
    this.FULL_SCHEDULE = this.storageService.loadScheduleFromLocalStorage() || [];
    this.FULL_SCHEDULE.forEach(game => {
      if (game.quarter !== 'F' && game.quarter !== null) {
        this.resetIncompleteGame(game);
      }
      if (game.visitScore !== null) {
        this.currentGame++;
      }
    });
    // this.currentGame = this.currentGame > 0 ? this.currentGame-- : 0;
    this.setCurrentGame(this.currentGame);
  }

  resetIncompleteGame(game: ISchedule) {
    game.visitScore = null;
    game.visitRecord = null;
    game.homeScore = null,
    game.homeRecord = null;
    game.quarter = null;
    game.spread = null;
    game.overtime = null;
    game.gameResults = [];
  }

  buildFullSchedule() {
    // console.log('[schedule.service] buildFullSchedule()');
    this.loadScheduleFromStorage();

    if (this.SCHEDULE.length < 1) {
      this.SCHEDULE = _SCHEDULE;
    }

    if (this.FULL_SCHEDULE.length < 1) {
      // console.log('[schedule.service] building');
      this.FULL_SCHEDULE = [];
      let counter: number = 0;
      this.SCHEDULE.forEach(day => {
        for (let i = 0; i < day.games.length; i++) {
          const nextGame: ISchedule = {
            id: counter++,
            gameday: day.gameday,
            visitTeam: day.games[i],
            visitScore: null,
            homeTeam: day.games[i + 1],
            homeScore: null,
            quarter: null,
            gameResults: []
          };
          this.FULL_SCHEDULE.push(nextGame);
          i++;
        }
      });

      // console.log('[schedule.service] FULL_SCHEDULE built!');
      // console.table(this.FULL_SCHEDULE);
      this.storageService.storeScheduleToLocalStorage(this.FULL_SCHEDULE);
    }

    this.finalGame = (this.FULL_SCHEDULE.length - 1);
    this.setFinalGame(this.finalGame);
    this.currentGameDay = this.currentGame <= this.finalGame ? this.FULL_SCHEDULE[this.currentGame].gameday : 'Playoffs';
    this.setCurrentGameDay(this.currentGameDay);
    this.endOfSeason = this.currentGame > this.finalGame;
    this.setEndOfSeason(this.endOfSeason);

    console.log('[schedule.service] buildFullSchedule() Complete!');
  }

  getFullSchedule(): ISchedule[] {
    return this.FULL_SCHEDULE;
  }

  getGamesForDay(searchTerm: string): ISchedule[] {
    // console.log('[schedule.service] getGamesForDay() searchTerm: ' + searchTerm);
    return this.FULL_SCHEDULE.filter(day => day.gameday === searchTerm);
  }

  hasGamesForDay(searchTerm: string): boolean {
    let games: ISchedule[] = [];
    games = this.FULL_SCHEDULE.filter(day => day.gameday === searchTerm);
    return games.length > 0 ? true : false;
  }

  // getGamesForTeam(team: number): ISchedule[] {
  //   // console.log('[schedule.service] getGamesForTeam() team: ' + team);
  //   return this.FULL_SCHEDULE.filter(game => ((game.visitTeam === team) || (game.homeTeam === team)));
  // }

  getGamesForTeam(team: number): Observable<ISchedule[]> {
    // console.log('[schedule.service] getGamesForTeam() team: ' + team);

    const subject = new Subject<ISchedule[]>();

    setTimeout(() => {
      subject.next(this.FULL_SCHEDULE.filter(game => ((game.visitTeam === team) || (game.homeTeam === team))));
      subject.complete();
    }, 0);
    // .next adds data to the observable stream
    // using setTimeout to simulate aschrony
    return subject;
  }

  getGameById(id: number): ISchedule {
    return this.FULL_SCHEDULE.find(game => game.id === id);
  }

  getGameResults(id: number): Observable<IGameResults[]> {
    const subject = new Subject<IGameResults[]>();

    setTimeout(() => {subject.next(this.FULL_SCHEDULE.find(game => (game.id === id)).gameResults); subject.complete(); }, 0);
    return subject;
  }

  zeroPad(value: number, precision: number) {
    if (value === 0) {
      return '.000';
    }
    if (value === 1) {
      return '1.000';
    }

    let result = '' + value;
    if (result.length > (precision + 1)) {
      result = '' + (Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision));
    }
    const decPoint = result.indexOf('.');
    for (let i = (result.length - decPoint); i <= precision; i++) {
      result += '0';
    }
    if (result[0] !== '.') {
      result = result.substring(1, result.length);
    }
    return result;
  }

  getPCT(team: ITeam): string {
    return this.zeroPad((team.wins / (team.wins + team.losses)), 3);
  }

  playGame(game: ISchedule, simFast: boolean) {
    // console.log('[schedule.service] playGame() simFast: ' + simFast);
    const visitTeam = this.teamService.getTeamByIndex(game.visitTeam);
    const homeTeam = this.teamService.getTeamByIndex(game.homeTeam);

    console.log('[schedule.service] playGame() currentGame: ' + this.currentGame
      + ', ' + visitTeam.city + ' at ' + homeTeam.city);

      // PlayFakeGame.playFakeGame(game, simFast)
      PlayNFLGame.playNFLGame(game, visitTeam, homeTeam, simFast).subscribe((gameData: ISchedule) => {
      // console.log('[schedule.service] playGame() playing Game');
      this.gameService.setGameActive(true);
      game = gameData;
    }, (err) => {
      console.error('[schedule.service] playGame() playNFLGame error: ' + err);
    }, () => {
      // console.log('[schedule.service] playGame() GAME OVER');
      this.gameService.setGameActive(false);
      const overtime = game.quarter === 'OT';
      game.overtime = overtime;
      game.quarter = 'F';

      // Update in case sim season timing slightly updates the records
      game.visitRecord = visitTeam.wins + '-' + visitTeam.losses;
      game.homeRecord = homeTeam.wins + '-' + homeTeam.losses;

      if (game.visitScore > game.homeScore) {
        // console.log('[schedule.service] playGame() Visitors Win');
        visitTeam.wins++;
        visitTeam.visitwins++;
        homeTeam.losses++;
        homeTeam.homelosses++;
        if (visitTeam.division.substr(0, 3) === homeTeam.division.substr(0, 3)) {
          visitTeam.confwins++;
          homeTeam.conflosses++;
          if (visitTeam.division === homeTeam.division) {
            visitTeam.divwins++;
            homeTeam.divlosses++;
          }
        } else {
          visitTeam.othwins++;
          homeTeam.othlosses++;
        }
      } else {
        // console.log('[schedule.service] playGame() Home Wins');
        visitTeam.losses++;
        visitTeam.visitlosses++;
        homeTeam.wins++;
        homeTeam.homewins++;
        if (visitTeam.division.substr(0, 3) === homeTeam.division.substr(0, 3)) {
          visitTeam.conflosses++;
          homeTeam.confwins++;
          if (visitTeam.division === homeTeam.division) {
            visitTeam.divlosses++;
            homeTeam.divwins++;
          }
        } else {
          visitTeam.othlosses++;
          homeTeam.othwins++;
        }
      }

      visitTeam.pct = this.getPCT(visitTeam);
      visitTeam.pf += game.visitScore;
      visitTeam.pa += game.homeScore;
      homeTeam.pct = this.getPCT(homeTeam);
      homeTeam.pf += game.homeScore;
      homeTeam.pa += game.visitScore;

      this.storageService.storeScheduleToLocalStorage(this.FULL_SCHEDULE);

      if (game.id === this.finalGame) {
        console.log('[schedule.service] playGame() Regular Season Over');
        this.endOfSeason = true;
        this.setEndOfSeason(this.endOfSeason);
      }

      // this.storageService.storeTeamsToLocalStorage(this.teamService.getTeams());
      this.teamService.getTeams().subscribe((teamData: ITeam[]) => {
        this.storageService.storeTeamsToLocalStorage(teamData);
      }, (err) => {
        console.error('[schedule.service] playGame() getTeams() error: ' + err);
      });
    });
  }

  playNextGame(simFast: boolean): boolean {
    // console.log('[schedule.service] playNextGame() curr:' + this.currentGame + ' len:' + this.FULL_SCHEDULE.length);
    if (this.currentGame < this.FULL_SCHEDULE.length) {
      this.setCurrentGame(this.currentGame);

      this.currentGameDay = this.FULL_SCHEDULE[this.currentGame].gameday;
      // console.log('[schedule.service] playNextGame() currentGameDay: ' + this.currentGameDay);
      this.setCurrentGameDay(this.currentGameDay);

      this.playGame(this.FULL_SCHEDULE[this.currentGame], simFast);
      this.currentGame++;
      return true;
    } else {
      console.log('[schedule.service] playNextGame() Season Over');
      this.currentGameDay = 'Playoffs';
      this.setCurrentGameDay(this.currentGameDay);
      return false;
    }
  }
}
