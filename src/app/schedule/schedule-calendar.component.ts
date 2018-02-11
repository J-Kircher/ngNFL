import { Component, OnInit } from '@angular/core';
import { NFLCalendar } from '../model/nfl.model';

@Component({
  selector: 'schedule-calendar',
  template: `
    <div class="container well col-sm-12">
      <div class="row well schedule">
        <div class="schedule col-sm-12">
          <div class="col-sm-12" style="margin-top:5px">
            Schedule
          </div>
          <div *ngFor="let schedDate of NFLCalendarArr">
            <schedule-month [month]="schedDate.month" [year]="schedDate.year"></schedule-month>
          </div>
        </div>
      </div>
    </div>
`,
  styles: [`
    .schedule {
      font-family: Arial;
      font-style: italic;
      font-size: 14pt;
      font-weight: bold;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
  `]
})

export class ScheduleCalenderComponent implements OnInit {
  NFLCalendarArr: NFLCalendar[] = [];

  ngOnInit() {
    this.NFLCalendarArr = [{ month: 9, year: 2017}, { month: 10, year: 2017}, { month: 11, year: 2017}, { month: 12, year: 2017}];
  }
}
