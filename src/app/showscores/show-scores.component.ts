import { Component, OnInit, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScheduleService } from '../service/schedule.service';
import { ResultsDialogComponent } from '../dialog/results/results-dialog.component';
import { ISchedule } from '../model/nfl.model';

@Component({
  selector: 'show-scores',
  templateUrl: './show-scores.component.html',
  styleUrls: ['./show-scores.component.scss']
})

export class ShowScoresComponent implements OnInit, DoCheck {
  gameDay: string;
  gamesArr: ISchedule[] = [];

  dialogReturn: any;

  constructor(
    private scheduleService: ScheduleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.scheduleService.currentGameDay$.subscribe(data => this.gameDay = data);
  }

  ngDoCheck() {
    // console.log('[show-scores] ngDoCheck()');
    this.gamesArr = this.scheduleService.getGamesForDay(this.gameDay).filter(day => day.homeScore !== null);
  }

  openResultsDialog(id: number): void {
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[show-scores] openResultsDialog() afterClosed() error: ' + err);
    });
  }

  getResults(id: number) {
    // console.log('[show-scores] getResults: ' + id);
    this.openResultsDialog(id);
  }
}
