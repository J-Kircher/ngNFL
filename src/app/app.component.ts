import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScheduleService } from '@app/service/schedule.service';
import { TeamService } from '@app/service/team.service';
import { fadeAnimation } from '@app/shared/animations';

@Component({
  selector: 'app-nfl',
  templateUrl: './app.component.html',
  styles: [],
  animations: [fadeAnimation]
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

  prepareRoute(outlet: RouterOutlet) {
    // console.log('[app] prepareRoute() 1:');
    // console.log(outlet.isActivated ? outlet.activatedRoute : '');
    // return outlet.isActivated ? outlet.activatedRoute : '';

    // console.log('[app] prepareRoute() route: ' + (outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']));
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
