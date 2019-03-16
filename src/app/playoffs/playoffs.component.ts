import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TeamService } from '../service/team.service';
import { ITeam, ISchedule, IGameResults } from '../model/nfl.model';
import { PlayoffService } from '../service/playoff.service';
import { MatchupDialogComponent } from '../dialog/matchup/matchup-dialog.component';
import { ResultsDialogComponent } from '../dialog/results/results-dialog.component';
import { listAnimation } from '../shared/animations';

@Component({
  selector: 'playoffs',
  templateUrl: './playoffs.component.html',
  styleUrls: ['./playoffs.component.scss'],
  animations: [listAnimation]
})

export class PlayoffsComponent implements OnInit {
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  playoffTeams: number[] = [];
  SuperBowlChamp: number;
  loading: boolean = true;

  dialogReturn: any;

  currentPlayoffGame: number = 0;
  currentPlayoffGameDay: string;
  playoffGames: ISchedule[];
  GameDay: string[] = [];
  PlayoffBracket: number[] = new Array(22);

  constructor(
    private teamService: TeamService,
    private playoffService: PlayoffService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // console.log('[playoffs] ngOnInit()');
    // Reset season needs to also reset playoffs!
    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[playoffs] ngOnInit() getTeams() SUCCESS');

      this.playoffService.getPlayoffTeams().subscribe((tData: number[]) => {
        this.playoffTeams = tData;
      }, (err) => {
        console.error('[playoffs] ngOnInit() getPlayoffTeams() error: ' + err);
      }, () => {
        console.log('[playoffs] ngOnInit() getPlayoffTeams() COMPLETE');

        this.playoffService.initPlayoffs();
        this.playoffGames = this.playoffService.PLAYOFF_SCHEDULE;
        this.loading = false;
        // window.scrollTo(0, 0);
      });

    }, (err) => {
      console.error('[playoffs] ngOnInit() getTeams() error: ' + err);
    });

    this.playoffService.currentPlayoffGame$.subscribe(data => this.currentPlayoffGame = data);
    this.playoffService.currentPlayoffGameDay$.subscribe(data => this.currentPlayoffGameDay = data);
    // this.GameDay = [...Array.from(new Set(this.playoffGames.map(s => s.gameday)))];
    this.playoffService.GameDay$.subscribe(data => this.GameDay = data);
    this.playoffService.PlayoffBracket$.subscribe(data => this.PlayoffBracket = data);
    this.playoffService.SuperBowlChamp$.subscribe(data => this.SuperBowlChamp = data);
  }

  getAbbrev(idx: number) {
    let abbrev = 'blank';
    // console.log('[playoffs] getAbbrev() idx: ' + idx + ', playoffbracket: ' + this.PlayoffBracket[idx]);
    if (this.PlayoffBracket[idx] > -1) {
      abbrev = this.teamsArr[this.PlayoffBracket[idx]].abbrev;
    }
    return abbrev;
  }

  // getAbbrev(id: number, hv: string) {
  //   let abbrev = 'blank';

  //   if (this.playoffGames[id]) {
  //     if (hv === 'v') {
  //       abbrev = this.teamsArr[this.playoffGames[id].visitTeam].abbrev;
  //     } else {
  //       abbrev = this.teamsArr[this.playoffGames[id].homeTeam].abbrev;
  //     }
  //   }

  //   return abbrev;
  // }

  showTeam(teamId: number) {
    const team = this.teamService.getTeamByIndex(teamId);
    return team.city + ' ' + team.name;
  }

  getGamesForDay(day: string) {
    return this.playoffService.getGamesForDay(day);
  }

  openResultsDialog(id: number): void {
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      data: { id: id, playoffs: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[playoffs] openResultsDialog() afterClosed() error: ' + err);
    });
  }

  openMatchupDialog(id: number): void {
    const dialogRef = this.dialog.open(MatchupDialogComponent, {
      data: { id: id, playoffs: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[playoffs] openMatchupDialog() afterClosed() error: ' + err);
    });
  }

  getMatchup(id: number) {
    // console.log('[playoffs] getMatchup: ' + id);

    this.playoffService.getGameResults(id).subscribe((results: IGameResults[]) => {
      if (results.length) {
        this.openResultsDialog(id);
      } else {
        this.openMatchupDialog(id);
      }
    });
  }
}
