import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../../service/team.service';
import { ITeam, ISchedule, IGameResults } from '../../model/nfl.model';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss']
})
export class ResultsDialogComponent implements OnInit {
  teamsArr: ITeam[] = [];
  modalGame: ISchedule;
  results: IGameResults[];
  loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ResultsDialogComponent>,
    private teamService: TeamService,
    private scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    // console.log('[results] data: ' + this.data);
    this.modalGame = this.scheduleService.getGameById(this.data.id);

    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      this.results = this.modalGame.gameResults;
      this.loading = false;
    }, (err) => {
      console.error('[results] ngOnInit() getTeams() error: ' + err);
    });
  }

  getQuarter(quarter) {
    switch (quarter) {
      case '1': return 'First Quarter';
      case '2': return 'Second Quarter';
      case '3': return 'Third Quarter';
      case '4': return 'Fourth Quarter';
      case 'OT': return 'Overtime';
      default: return '?';
    }
  }

  getScore(score) {
    switch (score) {
      case 3: return 'Field Goal';
      case 7: return 'Touchdown';
      default: return '?';
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
