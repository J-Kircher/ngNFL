import { Component, Input, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeamService } from '@app/service/team.service';
import { ScheduleService } from '@app/service/schedule.service';
import { ITeam } from '@app/model/nfl.model';
import { sortDivision, sortDivisionByTotal } from '@app/common/sort';

@Component({
  selector: 'standings-division',
  templateUrl: './standings-division.component.html',
  styleUrls: ['./standings-division.component.scss']
})

export class StandingsDivisionComponent implements OnInit, DoCheck {
  @ViewChild(MatSort) sort: MatSort;
  @Input() division: string;
  @Input() format: string;
  teamsArr: ITeam[] = [];
  divisionTeams: ITeam[] = [];
  currentGame: number = 0;
  loading: boolean = true;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource();

  constructor(
    private router: Router,
    private teamService: TeamService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.scheduleService.currentGame$.subscribe(data => this.currentGame = data);
    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
    }, (err) => {
      console.error('[standings-div] ngOnInit() getTeams() error: ' + err);
    }, () => {
      // console.log('[standings-div] ngOnInit() getTeams() SUCCESS');
      this.loading = false;
    });
  this.displayedColumns = ['team', 'wins', 'losses', 'pct', 'pf', 'pa', 'homewins', 'visitwins', 'divwins', 'confwins', 'othwins'];
  }

  ngDoCheck() {
    // console.log('[standings-div] ngDoCheck() division: ' + this.division);

    if (this.currentGame > 0) {
      this.divisionTeams = this.teamService.getTeamsForDivision(this.division).sort(sortDivision);
      this.displayedColumns[3] = 'pct';
    } else {
      this.divisionTeams = this.teamService.getTeamsForDivision(this.division).sort(sortDivisionByTotal);
      this.displayedColumns[3] = 'total';
    }
    this.dataSource = new MatTableDataSource(this.divisionTeams);
    this.dataSource.sort = this.sort;
  }

  getClass() {
    return {
      standard: (this.format === 'standard'),
      expanded: (this.format === 'expanded')
    };
  }

  isMobileView() {
    return (window.innerWidth <= 599);
  }

  showTeam(abbrev: string) {
      this.router.navigate(['/teams/' + abbrev]);
  }
}
