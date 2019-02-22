import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ISchedule } from '../model/nfl.model';
import { ScheduleDayService } from '../service/schedule.day.service';
import { MatchupDialogComponent } from '../dialog/matchup/matchup-dialog.component';
import { listAnimation } from '../shared/animations';

@Component({
  selector: 'schedule-day',
  templateUrl: './schedule-day.component.html',
  animations: [listAnimation],
  styles: [`
    mat-card {
      margin: 12px;
      padding: 8px;
    }
    .schedule {
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
    .gameday-text {
      margin-bottom: 5px;
    }
    .gameday {
      background-color: #DDD;
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      cursor: pointer;
      margin: 4px;
      transition: background-color 280ms cubic-bezier(.4,0,.2,1);
    }
    .gameday:hover {
      border-color: rgba(0, 0, 0, 0.8);
      background-color: rgb(238, 238, 238);
    }
  `]
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

  openTopTeamsDialog(id: number): void {
    const dialogRef = this.dialog.open(MatchupDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[schedule-day] openTopTeamsDialog() afterClosed() error: ' + err);
    });
  }

  getMatchup(id: number) {
    // console.log('[schedule-day] getMatchup: ' + id);
    this.openTopTeamsDialog(id);
  }
}
