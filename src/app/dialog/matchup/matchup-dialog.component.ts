import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '@app/service/team.service';
import { ITeam, ISchedule } from '@app/model/nfl.model';
import { ScheduleService } from '@app/service/schedule.service';
import { PlayoffService } from '@app/service/playoff.service';
import { calculateOdds, getOddsText } from '@app/common/odds';

@Component({
  selector: 'app-matchup-dialog',
  templateUrl: './matchup-dialog.component.html',
  styleUrls: ['./matchup-dialog.component.scss']
})
export class MatchupDialogComponent implements OnInit {
  teamsArr: ITeam[] = [];
  modalGame: ISchedule;
  loading: boolean = true;
  odds: number = 0;

  constructor(
    public dialogRef: MatDialogRef<MatchupDialogComponent>,
    private teamService: TeamService,
    private scheduleService: ScheduleService,
    private playoffService: PlayoffService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    // console.log('[matchup] data: ' + this.data);
    if (this.data.playoffs) {
      this.modalGame = this.playoffService.getGameById(this.data.id);
    } else {
      this.modalGame = this.scheduleService.getGameById(this.data.id);
    }

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[matchup] ngOnInit() getTeams() SUCCESS');
      this.loading = false;
      this.odds = calculateOdds(this.teamsArr[this.modalGame.visitTeam], this.teamsArr[this.modalGame.homeTeam]);
    }, (err) => {
      console.error('[matchup] ngOnInit() getTeams() error: ' + err);
    });
  }

  getOdds() {
    const visit = this.teamsArr[this.modalGame.visitTeam] ? this.teamsArr[this.modalGame.visitTeam].abbrev : '';
    const home = this.teamsArr[this.modalGame.homeTeam] ? this.teamsArr[this.modalGame.homeTeam].abbrev : '';
    return getOddsText(this.odds, visit, home);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
