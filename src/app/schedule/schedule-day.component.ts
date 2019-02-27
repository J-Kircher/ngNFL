import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ISchedule } from '../model/nfl.model';
import { ScheduleDayService } from '../service/schedule.day.service';
import { MatchupDialogComponent } from '../dialog/matchup/matchup-dialog.component';
import { listAnimation } from '../shared/animations';

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

  openMatchupDialog(id: number): void {
    const dialogRef = this.dialog.open(MatchupDialogComponent, {
      data: { id: id }
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
    this.openMatchupDialog(id);
  }
}
