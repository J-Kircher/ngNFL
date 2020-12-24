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
  teamsArrList: ITeam[] = [];
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
    }, () => {
      // console.log('[team-list] ngOnInit() getTeams() COMPLETE');
      this.teamsArrList = JSON.parse(JSON.stringify(this.teamsArr)).sort((n1: ITeam, n2: ITeam) => {
        const t1 = n1.city.concat(' ').concat(n1.name);
        const t2 = n2.city.concat(' ').concat(n2.name);
        return ((t1 > t2) ? 1 : ((t1 < t2) ? -1 : 0));
      });
    });
  }

  showTeam(abbrev: string) {
    this.router.navigate(['/teams/' + abbrev]);
  }
}
