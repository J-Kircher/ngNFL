import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NFLCalendar, ISchedule } from '../model/nfl.model';
import { ScheduleService } from '../service/schedule.service';
import { ScheduleDayService } from '../service/schedule.day.service';

@Component({
  selector: 'schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
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
