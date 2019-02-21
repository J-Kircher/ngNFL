import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeamService } from '../../service/team.service';
import { ITeam, ISchedule } from '../../model/nfl.model';
import { ScheduleService } from '../../service/schedule.service';

@Component({
  selector: 'app-matchup-dialog',
  templateUrl: './matchup-dialog.component.html',
  styleUrls: ['./matchup-dialog.component.scss']
})
export class MatchupDialogComponent implements OnInit {
  teamsArr: ITeam[] = [];
  modalGame: ISchedule;
  loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<MatchupDialogComponent>,
    private teamService: TeamService,
    private scheduleService: ScheduleService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    // console.log('[matchup] data: ' + this.data);
    this.modalGame = this.scheduleService.getGameById(this.data.id);

    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[matchup] ngOnInit() getTeams() SUCCESS');
      this.loading = false;
    }, (err) => {
      console.error('[matchup] ngOnInit() getTeams() error: ' + err);
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
