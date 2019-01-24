import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'show-game',
  template: `
    <div *ngIf="!loading" class="container well col-sm-12">
      <div class="well showgame">
        <div class="show-center">
          <img src="/assets/images/NFLToday.gif" name="NFLToday">
        </div>
        <div class="show-center">
          <div><img src="/assets/images/V40.gif" name="Vteam" width="40" height="40"></div>
          <div><img name="s11" src="/assets/images/0.gif"><img name="s12" src="/assets/images/0.gif"></div>
          <div><img src="/assets/images/Quarter.gif"></div>
        </div>
        <div class="show-center" style="margin-bottom: 0px;">
          <div><img src="/assets/images/H40.gif" name="Hteam" width="40" height="40"></div>
          <div><img name="s21" src="/assets/images/0.gif"><img name="s22" src="/assets/images/0.gif"></div>
          <div><img src="/assets/images/F.gif" name="Period"></div>
        </div>
      </div>
    </div>
    <div class="well loading-well" *ngIf="loading">
      <div style="float:left;"><img src="/assets/images/loading.gif" height="40"></div>
      <div class="loading-font" style="float:right">&nbsp; Loading Game &hellip;</div>
    </div>
  `,
  styles: [`
    .showgame {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background: black;
      margin: 5px;
      padding: 5px;
      border-radius: 10px;
    }
    .show-center {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 5px;
      background: #333;
    }
`]
})

export class ShowGameComponent implements OnInit {
  teamsArr: ITeam[] = [];
  loading: boolean = true;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[show-game] ngOnInit() getTeams() SUCCESS');
      this.loading = false;
    }, (err) => {
      console.error('[show-game] ngOnInit() getTeams() error: ' + err);
    });
  }
}
