import { Component, OnInit, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ScheduleService } from '../service/schedule.service';
import { PlayoffService } from '../service/playoff.service';
import { ResultsDialogComponent } from '../dialog/results/results-dialog.component';
import { ISchedule } from '../model/nfl.model';
import { listAnimation } from '../shared/animations';

@Component({
  selector: 'show-scores',
  templateUrl: './show-scores.component.html',
  styleUrls: ['./show-scores.component.scss'],
  animations: [listAnimation]
})

export class ShowScoresComponent implements OnInit, DoCheck {
  gameDay: string;
  gamesArr: ISchedule[] = [];
  postseason: boolean = false;
  playoffGameDay: string;

  dialogReturn: any;

  constructor(
    private scheduleService: ScheduleService,
    private playoffService: PlayoffService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.scheduleService.endOfSeason$.subscribe(data => this.postseason = data);
    this.scheduleService.currentGameDay$.subscribe(data => this.gameDay = data);
    this.playoffService.currentPlayoffGameDay$.subscribe(data => this.playoffGameDay = data);
  }

  ngDoCheck() {
    // console.log('[show-scores] ngDoCheck()');
    // console.log('[show-scores] ngDoCheck() postseason: ' + this.postseason);
    // console.log('[show-scores] ngDoCheck() playoffGameDay: ' + this.playoffGameDay);
    if (!this.postseason) {
      this.gamesArr = this.scheduleService.getGamesForDay(this.gameDay).filter(day => day.homeScore !== null);
    } else {
      this.gamesArr = this.playoffService.getGamesForDay(this.playoffGameDay).filter(day => day.homeScore !== null);
    }
  }

  openResultsDialog(id: number, playoffs: boolean = false): void {
    const dialogRef = this.dialog.open(ResultsDialogComponent, {
      data: { id: id, playoffs: playoffs }
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
    this.openResultsDialog(id, this.postseason);
  }
}
