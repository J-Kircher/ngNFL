import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NFLCalendar, ISchedule } from '@app/model/nfl.model';
import { ScheduleService } from '@app/service/schedule.service';
import { ScheduleDayService } from '@app/service/schedule.day.service';

@Component({
  selector: 'schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})

export class ScheduleCalenderComponent implements OnInit, AfterContentInit {
  calendarArr: NFLCalendar[] = [];
  gameDay: string;
  gamesArr: ISchedule[] = [];
  scheduleYear: number = 2025;
  fullSchedule: ISchedule[];

  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(
    private scheduleService: ScheduleService,
    private scheduleDayService: ScheduleDayService
  ) { }

  ngOnInit() {
    console.log('[schedule-calendar] ngOnInit() scheduleYear: ' + this.scheduleYear);
    this.fullSchedule = this.scheduleService.getFullSchedule();
    this.calendarArr = [];
    let currMonth = '';
    let currYear = this.scheduleYear;
    this.fullSchedule.forEach(schedDay => {
      const vals = schedDay.gameday.split(' ');
      const month = vals[1];
      if (month !== currMonth) {
        currMonth = month;
        if (month === 'January') {
          currYear++;
        }
        this.calendarArr.push(
          { 'month': this.monthNames.indexOf(currMonth) + 1, 'year': currYear }
        );
      }
    });
    console.log(this.calendarArr);
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
