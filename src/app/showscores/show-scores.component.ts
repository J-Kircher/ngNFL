import { Component, OnInit, DoCheck } from '@angular/core';
import { ScheduleService } from '../service/schedule.service';
import { ISchedule } from '../model/nfl.model';

@Component({
  selector: 'show-scores',
  templateUrl: './show-scores.component.html',
  styleUrls: ['./show-scores.component.scss']
})

export class ShowScoresComponent implements OnInit, DoCheck {
  gameDay: string;
  gamesArr: ISchedule[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.scheduleService.currentGameDay$.subscribe(data => this.gameDay = data);
  }

  ngDoCheck() {
    // console.log('[show-scores] ngDoCheck()');
    this.gamesArr = this.scheduleService.getGamesForDay(this.gameDay).filter(day => day.homeScore !== null);
  }
}
