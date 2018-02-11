import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam, ISchedule } from '../model/nfl.model';

@Component({
  selector: 'show-score',
  template: `
    <div class="team-info"><img src="/assets/images/{{teamsArr[score.visitTeam].abbrev}}.png" class="logo">
      <span class="score"> {{score.visitScore}} </span>
      <span class="team-city">{{teamsArr[score.visitTeam].city}}</span><br>
      <span class="team-name">{{teamsArr[score.visitTeam].name}}</span>
    </div>
    <div class="team-info"><img src="/assets/images/{{teamsArr[score.homeTeam].abbrev}}.png" class="logo">
      <span class="score"> {{score.homeScore}} </span>
      <span class="team-city">{{teamsArr[score.homeTeam].city}}</span><br>
      <span class="team-name">{{teamsArr[score.homeTeam].name}}</span>
    </div>
  `,
  styles: [`
    .team-info {
      white-space: nowrap;
      text-align: left;
      x-line-height: 18px;
    }
    .logo {
      float:left;
      height: 40px;
    }
    .score {
      font-family: Arial;
      font-size: 14pt;
      text-align: center;
      // background: rgba(255, 255, 255, 0.5);
      margin: 2px;
      padding: 5px;
      border-radius: 5px;
      float: right;
    }
    .team-city {
      font-family: Arial;
      font-size: 10pt;
      font-weight: normal;
      font-style: normal;
      -webkit-padding-start: 5px;
    }
    .team-name {
      font-family: Arial;
      font-size: 12pt;
      font-weight: bold;
      font-style: normal;
      -webkit-padding-start: 5px;
    }
  `]
})

export class ShowScoreComponent implements OnInit {
  @Input() score: ISchedule;
  teamsArr: ITeam[] = [];

  constructor(private teamService: TeamService) {  }

  ngOnInit() {
    // console.log('[show-score] ngOnInit()');
    // console.table(this.score);
    this.teamsArr = this.teamService.getTeams().map(teams => teams);
  }
}
