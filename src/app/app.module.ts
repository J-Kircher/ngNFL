import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { NFLRoutes } from './app.routes';
import { NavBarComponent } from './nav/navbar.component';
import { TeamListComponent } from './teams/team-list.component';
import { TeamService } from './service/team.service';
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
// import { SimpleModalComponent } from './common/simple-modal.component';
import { ConfigService } from './service/config.service';
import { TopTeamsDialogComponent } from './dialog/top-teams/top-teams-dialog.component';
import { MatchupDialogComponent } from './dialog/matchup/matchup-dialog.component';

// Loads application runtime config
export const appInitializerFn = (appConfig: ConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(NFLRoutes)
  ],
  entryComponents: [
    TopTeamsDialogComponent,
    MatchupDialogComponent
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
    TopTeamsDialogComponent,
    MatchupDialogComponent,
    // SimpleModalComponent
  ],
  providers: [
    TeamService,
    ScheduleService,
    PlayoffService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [ ConfigService ]
    }
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
