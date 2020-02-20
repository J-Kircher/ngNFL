import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ISchedule, IGameResults } from '@app/model/nfl.model';
import { ScheduleService } from '@app/service/schedule.service';
import { ScheduleDayService } from '@app/service/schedule.day.service';
import { MatchupDialogComponent } from '@app/dialog/matchup/matchup-dialog.component';
import { ResultsDialogComponent } from '@app/dialog/results/results-dialog.component';
import { listAnimation } from '@app/shared/animations';

@Component({
  selector: 'schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.scss'],
  animations: [listAnimation]
})

export class ScheduleDayComponent implements OnInit {
  gameDay: string;
  gamesArr: ISchedule[] = [];
  loading: boolean = true;

  dialogReturn: any;

  constructor(
    private scheduleService: ScheduleService,
    private scheduleDayService: ScheduleDayService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.scheduleDayService.scheduleDay$.subscribe(
      data => {
        // console.log('[schedule-day] scheduleDay received: ' + data);
        this.gameDay = data;
      }, (err) => {
        console.error('[schedule-day] ngOnInit() scheduleDay error: ' + err);
      });

    this.scheduleDayService.scheduleGames$.subscribe(
      data => {
        // console.log('[schedule-day] scheduleGames received: ' + data);
        this.gamesArr = data;
      }, (err) => {
        console.error('[schedule-day] ngOnInit() scheduleGames error: ' + err);
      });

    this.loading = false;
  }

  openResultsDialog(id: number): void {
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[schedule-day] openResultsDialog() afterClosed() error: ' + err);
    });
  }

  openMatchupDialog(id: number): void {
    const dialogRef = this.dialog.open(MatchupDialogComponent, {
      data: { id: id, playoffs: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[schedule-day] openMatchupDialog() afterClosed() error: ' + err);
    });
  }

  getMatchup(id: number) {
    // console.log('[schedule-day] getMatchup: ' + id);

    this.scheduleService.getGameResults(id).subscribe((results: IGameResults[]) => {
      if (results.length) {
        this.openResultsDialog(id);
      } else {
        this.openMatchupDialog(id);
      }
    });
  }
}
