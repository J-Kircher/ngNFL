import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam, ISchedule } from '../model/nfl.model';
import { ScheduleDayService } from '../service/schedule.day.service';
import { ScheduleService } from '../service/schedule.service';
import { SimpleModalComponent } from '../common/simple-modal.component';

@Component({
  selector: 'schedule-day',
  templateUrl: './schedule-day.component.html',
  styles: [`
    .schedule {
      font-family: Arial;
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      vertical-align: middle;
      margin: 0px;
      padding: 0px;
      border-radius: 10px;
    }
    .gameday {
      font-family: Arial;
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      cursor: pointer;
      margin: 0px;
      margin-bottom: 0px;
    }
    .gameday:hover {
      border-color: rgba(0, 128, 0, 0.5);
      background-color: rgba(0, 128, 0, 0.2);
    }
  `]
})

export class ScheduleDayComponent implements OnInit {
  teamsArr: ITeam[] = [];
  gameDay: string;
  gamesArr: ISchedule[] = [];
  modalGame: ISchedule;
  @ViewChild('childModal') childModal: SimpleModalComponent;

  constructor(private teamService: TeamService, private scheduleDayService: ScheduleDayService,
    private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.scheduleDayService.scheduleDay$.subscribe(
      data => {
          // console.log('[schedule-day] received: ' + data);
          this.gameDay = data;
        });

    this.scheduleDayService.scheduleGames$.subscribe(
      data => {
          // console.log('[schedule-day] received: ' + data);
           this.gamesArr = data;
          // console.table(data);
        });
  }

  matchupClick(id: number) {
    this.modalGame = this.scheduleService.getGameById(id);
    this.childModal.show();
  }
}
