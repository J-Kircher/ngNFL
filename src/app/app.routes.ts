import { Routes } from '@angular/router';
import { TeamListComponent } from './teams/team-list.component';
import { TeamDetailsComponent } from './teams/team-details.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';
import { PlayoffsComponent } from './playoffs/playoffs.component';

export const NFLRoutes: Routes = [
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/:abbrev', component: TeamDetailsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'standings', component: StandingsComponent },
  { path: 'playoffs', component: PlayoffsComponent },
  { path: '', redirectTo: '/teams', pathMatch: 'full' }
];
