import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ISchedule } from '../model/nfl.model';

@Injectable()
export class ScheduleDayService {

  // Observable sources
  private scheduleDaySource = new Subject<string>();
  private scheduleGamesSource = new Subject<ISchedule[]>();

  // Observable streams
  scheduleDay$ = this.scheduleDaySource.asObservable();
  scheduleGames$ = this.scheduleGamesSource.asObservable();

  // Service message commands
  setScheduleDay(scheduleInfo: string, scheduleGames: ISchedule[]) {
    // console.log('[schedule.day.service] setScheduleDay() scheduleInfo: ' + scheduleInfo);
    this.scheduleDaySource.next(scheduleInfo);
    this.scheduleGamesSource.next(scheduleGames);
  }
}
