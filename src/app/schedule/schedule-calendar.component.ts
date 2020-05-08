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
  NFLCalendarArr: NFLCalendar[] = [];
  gameDay: string;
  gamesArr: ISchedule[] = [];
  scheduleYear: number = 2020;

  constructor(
    private scheduleService: ScheduleService,
    private scheduleDayService: ScheduleDayService
  ) { }

  ngOnInit() {
    // console.log('[schedule-calendar] ngOnInit() scheduleYear: ' + this.scheduleYear);
    this.NFLCalendarArr = [
      { month: 9, year: this.scheduleYear },
      { month: 10, year: this.scheduleYear },
      { month: 11, year: this.scheduleYear },
      { month: 12, year: this.scheduleYear }
    ];
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
