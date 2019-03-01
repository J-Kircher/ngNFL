import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ScheduleService } from '../service/schedule.service';
import { TeamService } from '../service/team.service';
import { ITeam, ISchedule, IGameResults } from '../model/nfl.model';
import { MatchupDialogComponent } from '../dialog/matchup/matchup-dialog.component';
import { ResultsDialogComponent } from '../dialog/results/results-dialog.component';
import { listAnimation } from '../shared/animations';

@Component ({
  selector: 'team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.scss'],
  animations: [listAnimation]
})

export class TeamScheduleComponent implements OnInit {
  team: ITeam;
  teamsArr: ITeam[] = [];
  teamIndex: number;
  teamSchedule: ISchedule[];
  loading: boolean = true;

  dialogReturn: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private teamService: TeamService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.team = this.teamService.getTeam(params['abbrev']);
      // console.log('[team-schedule] ngOnInit() team: ' + this.team.city + ' ' + this.team.name);
      // this.teamsArr = this.teamService.getTeams().map(teams => teams);

      this.teamService.getTeams().subscribe((teamData: ITeam[]) => {
        this.teamsArr = teamData;
        // console.log('[team-schedule] ngOnInit() getTeams() SUCCESS');

        this.teamIndex = this.teamsArr.findIndex(team => team.abbrev === this.team.abbrev);
        this.scheduleService.getGamesForTeam(this.teamIndex).subscribe((schedData: ISchedule[]) => {
          this.teamSchedule = schedData;
          // console.table(this.teamSchedule);
          window.scrollTo(0, 0);
          this.loading = false;
        }, (err) => {
          console.error('[team-schedule] ngOnInit() getGamesForTeam() error: ' + err);
        });
      }, (err) => {
        console.error('[team-schedule] ngOnInit() getTeams() error: ' + err);
      });
    });
  }

  getOpponent(game: ISchedule): ITeam {
    if (game.visitTeam === this.teamIndex) {
      // console.log('[team-schedule] getOpponent() visit: ' + game.visitTeam);
      return this.teamsArr[game.homeTeam];
    }
    if (game.homeTeam === this.teamIndex) {
      // console.log('[team-schedule] getOpponent() home: ' + game.homeTeam);
      return this.teamsArr[game.visitTeam];
    }
  }

  showTeam(abbrev: string) {
    // showTeam(getOpponent(score).abbrev)
    // routing to the same component - TeamDetails needs to subscribe to the route paramaters;
    this.router.navigate(['/teams/' + abbrev]);
  }

  openResultsDialog(id: number): void {
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[team-schedule] openResultsDialog() afterClosed() error: ' + err);
    });
  }

  openMatchupDialog(id: number): void {
    const dialogRef = this.dialog.open(MatchupDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[team-schedule] openMatchupDialog() afterClosed() error: ' + err);
    });
  }

  getMatchup(id: number) {
    // Open results if game has been played - results dialog not created yet
    // Open matchup if game has not been played
    // console.log('[team-schedule] getMatchup: ' + id);

    this.scheduleService.getGameResults(id).subscribe((results: IGameResults[]) => {
      if (results.length) {
        this.openResultsDialog(id);
      } else {
        this.openMatchupDialog(id);
      }
    });
  }
}
