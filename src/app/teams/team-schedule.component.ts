import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ScheduleService } from '../service/schedule.service';
import { TeamService } from '../service/team.service';
import { ITeam, ISchedule } from '../model/nfl.model';

@Component ({
  selector: 'team-schedule',
  template: `
    <mat-card *ngIf="!loading">
      <div class="schedule">
        <div style="margin-top:5px">
          {{team.city}} {{team.name}} Schedule
        </div>
        <div fxLayout="row wrap" fxLayout.xs="column wrap">
          <div fxFlex.gt-xs="50%" fxFlex.gt-md="25%" *ngFor="let score of teamSchedule"
            (click)="showTeam(getOpponent(score).abbrev)">
            <mat-card class="gameday" matRipple appMaterialElevation>
              {{score.gameday}}
              <show-score [score]=score></show-score>
            </mat-card>
          </div>
        </div>
      </div>
    </mat-card>

    <mat-card class="loading-well" *ngIf="loading">
      <div style="float:left;"><img src="/assets/images/loading.gif" height="40"></div>
      <div class="loading-font" style="float:right">&nbsp; Loading Team Schedule &hellip;</div>
    </mat-card>
`,
  styles: [`
    mat-card {
      margin: 12px;
      padding: 8px;
    }
    .schedule {
      font-family: Arial;
      font-size: 14pt;
      font-weight: bold;
      font-style: italic;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
    .gameday {
      background-color: #DDD;
      font-family: Arial;
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      cursor: pointer;
      margin: 4px;
      transition: background-color 280ms cubic-bezier(.4,0,.2,1);
    }
    .gameday:hover {
      border-color: rgba(0, 0, 0, 0.8);
      background-color: rgb(238, 238, 238);
    }
  `]
})

export class TeamScheduleComponent implements OnInit {
  team: ITeam;
  teamsArr: ITeam[] = [];
  teamIndex: number;
  teamSchedule: ISchedule[];
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private teamService: TeamService
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
    // routing to the same component - TeamDetails needs to subscribe to the route paramaters;
    this.router.navigate(['/teams/' + abbrev]);
  }
}
