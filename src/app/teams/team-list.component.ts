import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'team-list',
  template: `
    <mat-card *ngIf="!loading">
      <div class="team-head" style="margin-top:5px">
        NFL Teams
      </div>
      <div  fxLayout="row wrap" fxLayout.xs="column wrap">
        <div fxFlex.gt-xs="50%" fxFlex.gt-md="25%" *ngFor="let team of teamsArr">
          <div class="team-info" (click)="showTeam(team.abbrev)"
            [ngStyle]="{'color':'#'+team.lightcolor, 'background-color':'#'+team.darkcolor}">
            <div style="margin:5px;">
              <img src="/assets/images/{{team.abbrev}}.png" class="logo">
              <span>{{team.city}}<br>{{team.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </mat-card>

    <mat-card class="loading-well" *ngIf="loading">
      <div style="float:left;"><img src="/assets/images/loading.gif" height="40"></div>
      <div class="loading-font" style="float:right">&nbsp; Loading Team List &hellip;</div>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 12px;
      padding: 8px;
    }
    .logo {
      float: left;
      margin-right: 5px;
      height: 40px;
    }
    .team-head {
      font-family: Arial;
      font-style: italic;
      font-size: 14pt;
      font-weight: bold;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
    .team-info {
      font-family: Arial;
      font-style: italic;
      font-size: 12pt;
      font-weight: bold;
      text-shadow: 2px 2px 0 rgba(0,0,0,1);
      vertical-align: middle;
      cursor: pointer;
      margin: 4px;
      padding: 1px 1px 5px;
      border-radius: 10px;
      min-width: 180px;
      max-width: 240px;
      width: 100%;
    }
  `]
})

// background-color: {{team.darkcolor}};
export class TeamListComponent implements OnInit {
  teamsArr: ITeam[] = [];
  loading: boolean = true;

  constructor(private router: Router, private teamService: TeamService) { }

  ngOnInit() {
    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[team-list] ngOnInit() getTeams() SUCCESS');
      this.loading = false;
    }, (err) => {
      console.error('[team-list] ngOnInit() getTeams() error: ' + err);
    });
  }

  showTeam(abbrev: string) {
    this.router.navigate(['/teams/' + abbrev]);
  }
}
