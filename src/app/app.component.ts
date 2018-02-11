import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './service/schedule.service';
import { TeamService } from './service/team.service';

@Component({
  selector: 'app-nfl',
  templateUrl: './app.component.html',
  styles: [`
    .title-well {
        font-family: Arial;
        font-style: italic;
        font-size: 32px;
        font-weight: bold;
        text-shadow: 2px 2px 0 rgba(0,0,0,1);
        padding-top: 0px;
        padding-bottom: 0px;
      }
    `]
})

export class AppComponent implements OnInit {
  loading: boolean = false;
  sport = 'NFL';

  constructor(private scheduleService: ScheduleService, private teamService: TeamService) {  }

  ngOnInit() {
    // Initialize the Full Schedule from the schedule input
    this.scheduleService.buildFullSchedule();
    this.teamService.initTeams();
  }
}
