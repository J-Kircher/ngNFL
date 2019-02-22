import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'standings',
  templateUrl: './standings.component.html',
  styles: [`
    mat-card {
      margin: 12px;
      padding: 8px;
    }
    .div-body {
      margin: 2px;
    }
    .standings {
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
