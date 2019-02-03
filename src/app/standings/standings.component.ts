import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'standings',
  template: `
    <mat-card *ngIf="!loading">
      <div class="standings" style="margin-top:5px">
        Standings
      </div>
      <mat-tab-group mat-stretch-tabs>
        <mat-tab label="Standard">
          <div id="standard" fxLayout="row wrap">
            <div class="div-body" fxFlex="48" *ngFor="let division of divisions">
              <standings-division [division]="division"></standings-division>
            </div>
          </div>
        </mat-tab>
        <mat-tab label="Expanded">
          <div id="expanded" fxLayout="column">
            <div class="div-body" *ngFor="let division of divisions">
              <standings-division-expanded [division]="division"></standings-division-expanded>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </mat-card>

    <mat-card class="well loading-well" *ngIf="loading">
      <div style="float:left;"><img src="/assets/images/loading.gif" height="40"></div>
      <div class="loading-font" style="float:right">&nbsp; Loading Standings &hellip;</div>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 12px;
      padding: 8px;
    }
    .div-body {
      margin: 2px;
    }
    .standings {
      font-family: Arial;
      font-style: italic;
      font-size: 14pt;
      font-weight: bold;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
  `]
})

export class StandingsComponent implements OnInit {
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  loading: boolean = true;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    // console.log('[standings] ngOnInit()');

    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    // this.divisions = ['AFC West', 'NFC West', 'AFC South', 'NFC South', 'AFC North', 'NFC North', 'AFC East', 'NFC East'];

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[standings] ngOnInit() getTeams() SUCCESS');

      this.teamsArr.forEach(team => {
        if (this.divisions.indexOf(team.division) < 0) {
          this.divisions.push(team.division);
        }
      });

      this.loading = false;
      window.scrollTo(0, 0);
    }, (err) => {
      console.error('[standings] ngOnInit() getTeams() error: ' + err);
    });
  }
}
