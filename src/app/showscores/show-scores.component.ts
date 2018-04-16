import { Component, DoCheck } from '@angular/core';
import { ScheduleService } from '../service/schedule.service';
import { ISchedule } from '../model/nfl.model';

@Component({
  selector: 'show-scores',
  template: `
    <div class="container well col-sm-12" style="margin-bottom: 0px;">
      <div class="row well showscores">
        <div class="col-sm-12" style="margin-top:5px">
          {{gameDay}}
        </div>
        <div class="showscores col-sm-12 div-scroll">
          <div class='well scoreboard col-sm-12' *ngFor="let score of gamesArr">
            <show-score [score]=score></show-score>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .showscores {
      font-family: Arial;
      font-size: 14pt;
      font-weight: bold;
      font-style: italic;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
    .div-scroll {
      max-height: 512px;
      overflow-y: scroll;
    }
    .scoreboard {
      font-family: Arial;
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      // background: rgba(0, 128, 0, 0.5);
      margin-bottom: 0px;
      border-radius: 5px;
    }
    .scoreboard:hover {
      border-color: rgba(0, 128, 0, 0.5);
      background-color: rgba(0, 128, 0, 0.2);
    }
  `]
})

export class ShowScoresComponent implements DoCheck {
  gameDay: string;
  gamesArr: ISchedule[] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngDoCheck() {
    // console.log('[show-scores] ngDoCheck()');
    this.gameDay = this.scheduleService.currentGameDay;
    this.gamesArr = this.scheduleService.getGamesForDay(this.gameDay).filter(day => day.homeScore !== null);
  }
}
