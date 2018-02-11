import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ScheduleService } from '../service/schedule.service';
import { TeamService } from '../service/team.service';
import { ITeam, ISchedule } from '../model/nfl.model';

@Component ({
  selector: 'team-schedule',
  template: `
    <div class="container well col-sm-12">
      <div class="row well schedule">
        <div class="schedule col-sm-12">
          <div class="col-sm-12" style="margin-top:5px">
            {{team.city}} {{team.name}} Schedule
          </div>
          <div class="well col-sm-3 gameday" *ngFor="let score of teamSchedule" (click)="showTeam(getOpponent(score).abbrev)">
            {{score.gameday}}
            <show-score [score]=score></show-score>
          </div>
        </div>
      </div>
    </div>
`,
  styles: [`
    .schedule {
      font-family: Arial;
      font-style: italic;
      font-size: 14pt;
      font-weight: bold;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
    .gameday {
      font-family: Arial;
      font-style: italic;
      font-size: 10pt;
      font-weight: bold;
      cursor: pointer;
      margin: 0px;
      margin-bottom: 0px;
    }
    .gameday:hover {
      border-color: rgba(0, 128, 0, 0.5);
      background-color: rgba(0, 128, 0, 0.2);
    }
  `]
})

export class TeamScheduleComponent implements OnInit {
  team: ITeam;
  teamsArr: ITeam[] = [];
  teamIndex: number;
  teamSchedule: ISchedule[];

  constructor(private router: Router, private route: ActivatedRoute,
    private scheduleService: ScheduleService, private teamService: TeamService) {  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.team = this.teamService.getTeam(params['abbrev']);
      // console.log('[team-schedule] ngOnInit() team: ' + this.team.city + ' ' + this.team.name);
      this.teamsArr = this.teamService.getTeams().map(teams => teams);
      this.teamIndex = this.teamsArr.findIndex(team => team.abbrev === this.team.abbrev);
      this.teamSchedule = this.scheduleService.getGamesForTeam(this.teamIndex);
      // console.table(this.teamSchedule);
      window.scrollTo(0, 0);
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
