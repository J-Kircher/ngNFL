import { Component, Input, OnInit } from '@angular/core';
import { ISchedule } from '../model/nfl.model';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleDayService } from '../service/schedule.day.service';

@Component({
  selector: 'schedule-month',
  template: `
    <div class="month">
      {{monthName}}
      <table class="month-table" width="100%">
        <tr *ngFor="let week of monthArr">
          <td *ngFor="let day of week">
            <a *ngIf="hasGamesForDay(month, year, day); else noLink" (click)="getGamesForDay(month, year, day)">{{day}}</a>
            <ng-template #noLink><div class="no-link">{{day}}</div></ng-template>
          </td>
        </tr>
      </table>
    </div>
  `,
  styles: [`
    a {
      color: green;
      cursor: pointer;
      font-weight: bold;
    }
    a:hover {
      border-color: rgba(0, 128, 0, 0.5);
      background-color: rgba(0, 128, 0, 0.2);
    }
    .no-link {
      color: black;
    }
    .month {
      font-style: italic;
      font-size: 12pt;
      font-weight: bold;
      text-align: center;
      background: rgba(0, 128, 0, 0.5);
      min-height: 120px;
      margin-bottom: 0px;
      border-radius: 5px;
      padding: 12px;
    }
    .month-table {
      font-size: 8pt;
      color: #666;
      background: url(/assets/images/whiteback.gif);
      min-height: 100px;
      border-radius: 5px;
    }
  `]
})

export class ScheduleMonthComponent implements OnInit {
  @Input() month: number;
  @Input() year: number;

  monthHTML: string;
  monthName: string;
  gamesArr: ISchedule[] = [];
  monthArr: number[][];

  monthNames = ['January', 'February', 'March',
    'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
  dayNames = ['Sunday', 'Monday', 'Tuesday',
    'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private scheduleService: ScheduleService,
    private scheduleDayService: ScheduleDayService
  ) { }

  ngOnInit() {
    this.monthName = this.monthNames[this.month - 1];
    this.buildMonth(this.month - 1, this.year);
  }

  getDaysInMonth(month: number, year: number): number {
    switch (month) {
      case 0: return 31;
      case 1: return 28;
      case 2: return 31;
      case 3: return 30;
      case 4: return 31;
      case 5: return 30;
      case 6: return 31;
      case 7: return 31;
      case 8: return 30;
      case 9: return 31;
      case 10: return 30;
      case 11: return 31;
      default: return 0;
    }
  }

  buildMonth(month: number, year: number) {
    let rowCounter = 0;
    let currentDay = 0;
    const daysInMonth: number = this.getDaysInMonth(month, year);
    const firstDayOfMonth: number = new Date(year, month, 1).getDay();
    // console.log('[schedule-month] buildMonth() firstDayOfMonth: ' + firstDayOfMonth)

    this.monthArr = [];
    while (currentDay < daysInMonth) {
      this.monthArr[rowCounter] = [];
      for (let i = 0; i < 7; i++) {
        if ( ((currentDay === 0) && (i < firstDayOfMonth)) || (currentDay >= daysInMonth) ) {
          this.monthArr[rowCounter][i] = null;
        } else {
          currentDay++;
          // console.log('[schedule-month] buildMonth() adding day ' + currentDay + ' to monthArr[' + rowCounter + '][' + i + ']');
          this.monthArr[rowCounter][i] = currentDay;
        }
      }
      rowCounter++;
    }
  }

  getGamesForDay(month: number, year: number, dayOfMonth: number) {
    const today = new Date(year, month - 1, dayOfMonth);
    const gameDay = this.dayNames[today.getDay()] + ', ' + this.monthNames[today.getMonth()] + ' ' + today.getDate();

    // console.log('[schedule-month] getGamesForDay() gameDay: ' + gameDay);
    this.gamesArr = this.scheduleService.getGamesForDay(gameDay);
    if (this.gamesArr.length > 0) {
      // console.log('[schedule-month] getGamesForDay() games: ' + this.gamesArr);
      this.scheduleDayService.setScheduleDay(gameDay, this.gamesArr);
    }
  }

  hasGamesForDay(month: number, year: number, dayOfMonth: number): boolean {
    const today = new Date(year, month - 1, dayOfMonth);
    const gameDay = this.dayNames[today.getDay()] + ', ' + this.monthNames[today.getMonth()] + ' ' + today.getDate();

    return this.scheduleService.hasGamesForDay(gameDay);
  }
}
