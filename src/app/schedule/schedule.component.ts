import { Component } from '@angular/core';
import { ScheduleDayService } from '@app/service/schedule.day.service';

@Component({
  selector: 'schedule', // Not necessarry, will be accessible via route
  template: `
    <schedule-calendar></schedule-calendar>
    <schedule-day></schedule-day>
  `,
  styles: [],
  providers: [ScheduleDayService]
})

export class ScheduleComponent  {
  scheduleDayInfo: string;
  constructor(private scheduleDayService: ScheduleDayService) { }
}
