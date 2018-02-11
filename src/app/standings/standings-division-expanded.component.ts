import { Component, Input, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../service/team.service';
import { ScheduleService } from '../service/schedule.service';
import { ITeam } from '../model/nfl.model';
import { sortDivision, sortDivisionByTotal } from '../common/sort';

@Component({
  selector: 'standings-division-expanded',
  templateUrl: './standings-division-expanded.component.html',
  styleUrls: ['./standings-division.component.scss']
})

export class StandingsDivisionExpandedComponent implements DoCheck {
  @Input() division: string;
  teamsArr: ITeam[] = [];
  divisionTeams: ITeam[] = [];
  currentGame: number = 0;

  constructor(private router: Router, private teamService: TeamService, private scheduleService: ScheduleService) {  }

  ngDoCheck() {
    // console.log('[standings-division] ngDoCheck() division: ' + this.division);
    this.teamsArr = this.teamService.getTeams().map(teams => teams);
    // this.divisionTeams = this.getTeamsForDivision(this.division);

    this.currentGame = this.scheduleService.currentGame;
    if (this.currentGame > 0) {
      this.divisionTeams = this.teamService.getTeamsForDivision(this.division).sort(sortDivision);
    } else {
      this.divisionTeams = this.teamService.getTeamsForDivision(this.division).sort(sortDivisionByTotal);
    }
  }

  showTeam(abbrev: string) {
      this.router.navigate(['/teams/' + abbrev]);
  }
}
