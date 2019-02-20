import { Routes } from '@angular/router';
import { TeamListComponent } from './teams/team-list.component';
import { TeamDetailsComponent } from './teams/team-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';
import { PlayoffsComponent } from './playoffs/playoffs.component';

export const NFLRoutes: Routes = [
  { path: 'teams', component: TeamListComponent, data: {animation: 'TeamsPage'} },
  { path: 'teams/:abbrev', component: TeamDetailsComponent, data: {animation: 'TeamPage'} },
  { path: 'schedule', component: ScheduleComponent, data: {animation: 'SchedulePage'} },
  { path: 'standings', component: StandingsComponent, data: {animation: 'StandingsPage'} },
  { path: 'playoffs', component: PlayoffsComponent, data: {animation: 'PlayoffsPage'} },
  { path: '', redirectTo: '/teams', pathMatch: 'full' }
];
