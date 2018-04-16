import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'standings',
  template: `
    <div class="container well col-sm-12" style="margin-bottom: 0px;">
      <div class="row well standings">
        <div class="standings col-sm-12">
          <div class="col-sm-12" style="margin-top:5px">
            Standings
          </div>
          <ul class="nav nav-tabs">
            <li style="float: right;">
              <a data-toggle="tab" href="#expanded">Expanded</a>
            </li>
            <li class="active" style="float: right;">
              <a data-toggle="tab" href="#standard">Standard</a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="standard" class="tab-pane fade in active">
              <div *ngFor="let division of divisions">
                <standings-division [division]="division"></standings-division>
              </div>
            </div>
            <div id="expanded" class="tab-pane fade">
              <div *ngFor="let division of divisions">
                <standings-division-expanded [division]="division"></standings-division-expanded>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
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

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    // console.log('[standings] ngOnInit()');

    this.teamsArr = this.teamService.getTeams().map(teams => teams);

    // this.divisions = ['AFC West', 'NFC West', 'AFC South', 'NFC South', 'AFC North', 'NFC North', 'AFC East', 'NFC East'];

    this.teamsArr.forEach(team => {
      if (this.divisions.indexOf(team.division) < 0) {
        this.divisions.push(team.division);
      }
    });

    window.scrollTo(0, 0);
  }
}
