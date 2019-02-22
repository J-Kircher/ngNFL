import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NFLCalendar, ISchedule } from '../model/nfl.model';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleDayService } from '../service/schedule.day.service';

@Component({
  selector: 'schedule-calendar',
  template: `
    <mat-card>
      <div class="schedule">
        <div style="margin-top:5px">
          Schedule
        </div>
        <div fxLayout="row wrap" fxLayout.xs="column wrap">
          <div fxFlex.gt-xs="50%" fxFlex.gt-md="25%" *ngFor="let schedDate of NFLCalendarArr">
            <div class="schedule-body">
              <schedule-month [month]="schedDate.month" [year]="schedDate.year"></schedule-month>
            </div>
          </div>
        </div>
      </div>
    </mat-card>
`,
  styles: [`
    mat-card {
      margin: 12px;
      padding: 8px;
    }
    .schedule {
      font-size: 14pt;
      font-weight: bold;
      font-style: italic;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
    .schedule-body {
      margin: 2px;
    }
  `]
})

export class ScheduleCalenderComponent implements OnInit, AfterContentInit {
  NFLCalendarArr: NFLCalendar[] = [];
  gameDay: string;
  gamesArr: ISchedule[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private scheduleDayService: ScheduleDayService
  ) { }

  ngOnInit() {
    // console.log('[schedule-calendar] ngOnInit()');
    this.NFLCalendarArr = [{ month: 9, year: 2017}, { month: 10, year: 2017}, { month: 11, year: 2017}, { month: 12, year: 2017}];
    this.scheduleService.currentGameDay$.subscribe(data => this.gameDay = data);
  }

  ngAfterContentInit() {
    // console.log('[schedule-calendar] ngAfterContentInit()');
    this.getGamesForDay(this.gameDay);
  }

  getGamesForDay(gameDay: string) {
    // console.log('[schedule-calendar] getGamesForDay() gameDay: ' + gameDay);
    this.gamesArr = this.scheduleService.getGamesForDay(gameDay);
    if (this.gamesArr.length > 0) {
      // console.log('[schedule-calendar] getGamesForDay() calling setScheduleDay()');
      this.scheduleDayService.setScheduleDay(gameDay, this.gamesArr);
    }
  }
}
