import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NFLRoutes } from './app.routes';
import { NavBarComponent } from './nav/navbar.component';
import { TeamListComponent } from './teams/team-list.component';
import { TeamService } from './service/team.service';
import { ITeam } from './model/nfl.model';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { TeamDetailsComponent } from './teams/team-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleService } from './service/schedule.service';
import { ScheduleCalenderComponent } from './schedule/schedule-calendar.component';
import { ScheduleDayComponent } from './schedule/schedule-day.component';
import { ScheduleMonthComponent } from './schedule/schedule-month.component';
import { StandingsComponent } from './standings/standings.component';
import { StandingsDivisionComponent } from './standings/standings-division.component';
import { StandingsDivisionExpandedComponent } from './standings/standings-division-expanded.component';
import { ShowGameComponent } from './showgame/show-game.component';
import { ShowScoresComponent } from './showscores/show-scores.component';
import { ShowScoreComponent } from './showscores/show-score.component';
import { TeamScheduleComponent } from './teams/team-schedule.component';
import { PlayoffsComponent } from './playoffs/playoffs.component';
import { PlayoffService } from './service/playoff.service';
import { SimpleModalComponent } from './common/simple-modal.component';
import { ModalTriggerDirectve } from './common/modal-trigger.directive';
import { JQUERY_TOKEN } from './common/jQuery.service';
export let jQuery: Object;

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(NFLRoutes)
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    TeamListComponent,
    CollapsibleWellComponent,
    TeamDetailsComponent,
    ScheduleComponent,
    ScheduleCalenderComponent,
    ScheduleDayComponent,
    ScheduleMonthComponent,
    StandingsComponent,
    StandingsDivisionComponent,
    StandingsDivisionExpandedComponent,
    ShowGameComponent,
    ShowScoresComponent,
    ShowScoreComponent,
    TeamScheduleComponent,
    PlayoffsComponent,
    SimpleModalComponent,
    ModalTriggerDirectve
  ],
  providers: [
    TeamService,
    ScheduleService,
    PlayoffService,
    { provide: JQUERY_TOKEN, useValue: jQuery }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
