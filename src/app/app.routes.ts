import { Routes } from '@angular/router';
import { TeamListComponent } from '@app/teams/team-list.component';
import { TeamDetailsComponent } from '@app/teams/team-details.component';
import { ScheduleComponent } from '@app/schedule/schedule.component';
import { StandingsComponent } from '@app/standings/standings.component';
import { PlayoffsComponent } from '@app/playoffs/playoffs.component';
import { HelpComponent } from '@app/help/help.component';

export const NFLRoutes: Routes = [
  { path: 'teams', component: TeamListComponent, data: {animation: 'TeamsPage'} },
  { path: 'teams/:abbrev', component: TeamDetailsComponent, data: {animation: 'TeamPage'} },
  { path: 'schedule', component: ScheduleComponent, data: {animation: 'SchedulePage'} },
  { path: 'standings', component: StandingsComponent, data: {animation: 'StandingsPage'} },
  { path: 'playoffs', component: PlayoffsComponent, data: {animation: 'PlayoffsPage'} },
  { path: 'help', component: HelpComponent, data: {animation: 'HelpPage'} },
  { path: '', redirectTo: '/teams', pathMatch: 'full' }
];
