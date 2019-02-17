import { Component, OnInit, DoCheck } from '@angular/core';
import { ScheduleService } from '../service/schedule.service';
import { ISchedule } from '../model/nfl.model';

@Component({
  selector: 'show-scores',
  template: `
    <mat-card>
      <div class="showscores">
        <div style="margin-top:5px">
          {{gameDay}}
        </div>
        <div class="showscores div-scroll">
          <div *ngFor="let score of gamesArr">
            <mat-card class="scoreboard">
              <show-score [score]=score></show-score>
            </mat-card>
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
      max-height: 540px;
      overflow-y: scroll;
    }
    .scoreboard {
      background-color: #DDD;
      // background: rgba(0, 128, 0, 0.5);
      font-family: Arial;
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      text-align: center;
      margin-bottom: 0px;
      border-radius: 5px;
    }
    .scoreboard:hover {
      border-color: rgba(0, 128, 0, 0.5);
      background-color: rgba(0, 128, 0, 0.2);
    }
  `]
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
