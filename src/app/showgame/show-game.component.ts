import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'show-game',
  templateUrl: './show-game.component.html',
  styleUrls: ['./show-game.component.scss']
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
