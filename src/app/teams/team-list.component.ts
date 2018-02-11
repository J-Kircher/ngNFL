import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'team-list',
  template: `
    <div class="container well col-sm-12">
      <div class="row well col-sm-3 team-info" *ngFor="let team of teamsArr"
        (click)="showTeam(team.abbrev)"
        [ngStyle]="{'color':'#'+team.lightcolor, 'background-color':'#'+team.darkcolor}">
        <div style="margin-top:5px;">
            <img src="/assets/images/{{team.abbrev}}.png" class="logo">
            <span>{{team.city}}<br>{{team.name}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .logo {
      float: left;
      margin-right: 5px;
      height: 40px;
    }
    .team-info {
        font-family: Arial;
        font-style: italic;
        font-size: 12pt;
        font-weight: bold;
        text-shadow: 2px 2px 0 rgba(0,0,0,1);
        vertical-align: middle;
        cursor: pointer;
        margin: 0px;
        padding: 1px 1px 5px;
        border-radius: 10px;
      }
  `]
})

// background-color: {{team.darkcolor}};
export class TeamListComponent implements OnInit {
  teamsArr: ITeam[] = [];

  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit() {
    this.teamsArr = this.teamService.getTeams().map(teams => teams);
  }

  showTeam(abbrev: string) {
    this.router.navigate(['/teams/' + abbrev]);
  }
}
