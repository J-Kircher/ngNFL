import { Component, OnInit } from '@angular/core';
import { NFLCalendar } from '../model/nfl.model';

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
      font-family: Arial;
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

export class ScheduleCalenderComponent implements OnInit {
  NFLCalendarArr: NFLCalendar[] = [];

  ngOnInit() {
    this.NFLCalendarArr = [{ month: 9, year: 2017}, { month: 10, year: 2017}, { month: 11, year: 2017}, { month: 12, year: 2017}];
  }
}
