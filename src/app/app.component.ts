import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './service/schedule.service';
import { TeamService } from './service/team.service';

@Component({
  selector: 'app-nfl',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent implements OnInit {
  loading: boolean = false;
  sport = 'NFL';

  constructor(
    private scheduleService: ScheduleService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    // Initialize the Full Schedule from the schedule input
    this.scheduleService.buildFullSchedule();
    this.teamService.initTeams();
  }
}
