import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ISchedule, IScheduleBase, ITeam } from '../model/nfl.model';
import { TeamService } from '../service/team.service';
import { ScheduleService } from '../service/schedule.service';
import { sortDivision, sortConference } from '../common/sort';

const SCHEDULE: IScheduleBase[] = [
  // {'gameday': 'Wildcard Weekend', 'games': [4, 3, 10, 9]},
  // {'gameday': 'Wildcard Weekend', 'games': [5, 2, 11, 8]},
  // {'gameday': 'Division Playoffs', 'games': [3, 0, 9, 6]},
  // {'gameday': 'Division Playoffs', 'games': [2, 1, 8, 7]},
  // {'gameday': 'Conference Championship', 'games': [1, 0, 7, 6]},
  // {'gameday': 'Super Bowl', 'games': [6, 0]}
];

@Injectable()
export class PlayoffService {
  PLAYOFF_SCHEDULE: ISchedule[] = [];
  currentGame: number = 0;
  currentGameDay: string;
  AFCPlayoffTeams: number[] = [];
  NFCPlayoffTeams: number[] = [];
  SuperBowlChamp: number;

  constructor(
    private teamService: TeamService,
    private scheduleService: ScheduleService
  ) { }

  buildPlayoffSchedule() {
    // console.log('[playoff-service] buildFullSchedule()');
    let counter: number = 0;
    SCHEDULE.forEach(day => {
      for (let i = 0; i < day.games.length; i++) {
        const currentGame: ISchedule = {
          id: counter++,
          gameday: day.gameday,
          visitTeam: day.games[i],
          visitScore: null,
          homeTeam: day.games[i + 1],
          homeScore: null,
          gameResults: []
        };
        this.PLAYOFF_SCHEDULE.push(currentGame);
        i++;
      }
    });
    this.currentGameDay = this.PLAYOFF_SCHEDULE[this.currentGame].gameday;
    // console.log('[playoff-service] PLAYOFF_SCHEDULE:');
    // console.table(this.PLAYOFF_SCHEDULE);
  }

  getGamesForDay(searchTerm: string): ISchedule[] {
    // console.log('[schedule.service] getGamesForDay() searchTerm: ' + searchTerm);
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

  playGame(game: ISchedule) {
    // console.log('[playoff-service] playGame()');
    // console.table(game);
    const visitTeam = this.teamService.getTeamByIndex(game.visitTeam);
    const homeTeam = this.teamService.getTeamByIndex(game.homeTeam);

    // game.visitScore = this.generateFakeScore(0);
    // game.homeScore = this.generateFakeScore(game.visitScore);

    if (game.visitScore > game.homeScore) {
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

    // visitTeam.pct = this.getPCT(visitTeam);
    visitTeam.pf += game.visitScore;
    visitTeam.pa += game.homeScore;
    // homeTeam.pct = this.getPCT(homeTeam);
    homeTeam.pf += game.homeScore;
    homeTeam.pa += game.visitScore;
  }

  playNextGame(): boolean {
    // console.log('[playoff-service] playNextGame() curr:' + this.currentGame + ' len:' + this.PLAYOFF_SCHEDULE.length);
    if (this.currentGame < this.PLAYOFF_SCHEDULE.length) {
      this.currentGameDay = this.PLAYOFF_SCHEDULE[this.currentGame].gameday;
      // console.log('[playoff-service] playNextGame() currentGameDay: ' + this.currentGameDay);

      this.playGame(this.PLAYOFF_SCHEDULE[this.currentGame]);
      this.currentGame++;
      return true;
    } else {
      console.log('[playoff-service] playNextGame() Season Over');
      return false;
    }
  }

  getAFCPlayoffTeams(): Observable<number[]> {
    const subject = new Subject<number[]>();
    // if (this.scheduleService.checkEndOfSeason() && this.AFCPlayoffTeams.length > 0) {
    //   console.log('[playoff.service] getAFCPlayoffTeams() Season is Over');
    //   setTimeout(() => {subject.next(this.AFCPlayoffTeams); subject.complete(); }, 0);
    //   // .next adds data to the observable stream
    //   // using setTimeout to simulate aschrony
    // } else {
      console.log('[playoff.service] getAFCPlayoffTeams() Need to build AFCPlayofffTeams');
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

        setTimeout(() => {subject.next(this.AFCPlayoffTeams); subject.complete(); }, 0);
        // .next adds data to the observable stream
        // using setTimeout to simulate aschrony
        return subject;
      }, (err) => {
        console.error('[playoffs.service-afc] ngOnInit() getAllCurrentTeams() error: ' + err);
      });
    // }
    return subject;
  }

  getNFCPlayoffTeams(): Observable<number[]> {
    const subject = new Subject<number[]>();
    // if (this.scheduleService.checkEndOfSeason() && this.NFCPlayoffTeams.length > 0) {
    //   console.log('[playoff.service] getNFCPlayoffTeams() Season is Over');
    //   setTimeout(() => {subject.next(this.NFCPlayoffTeams); subject.complete(); }, 0);
    //   // .next adds data to the observable stream
    //   // using setTimeout to simulate aschrony
    // } else {
      console.log('[playoff.service] getNFCPlayoffTeams() Need to build NFCPlayofffTeams');
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

        setTimeout(() => {subject.next(this.NFCPlayoffTeams); subject.complete(); }, 0);
        // .next adds data to the observable stream
        // using setTimeout to simulate aschrony
        return subject;
      }, (err) => {
        console.error('[playoffs.service-nfc] ngOnInit() getAllCurrentTeams() error: ' + err);
      });
    // }
    return subject;
  }
}
