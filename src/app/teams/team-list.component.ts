import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '@app/service/team.service';
import { ITeam } from '@app/model/nfl.model';
import { listAnimation } from '@app/shared/animations';

@Component({
  selector: 'team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  animations: [listAnimation]
})

// background-color: {{team.darkcolor}};
export class TeamListComponent implements OnInit {
  teamsArr: ITeam[] = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private teamService: TeamService
  ) { }

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
