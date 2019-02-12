import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import { StorageService } from '../service/storage.service';
import { ScheduleService } from '../service/schedule.service';
import { TeamService } from '../service/team.service';
import { TopTeamsDialogComponent } from '../dialog/top-teams/top-teams-dialog.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavBarComponent {
  private postseason: boolean = false;

  dialogReturn: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private scheduleService: ScheduleService,
    private teamService: TeamService,
    public dialog: MatDialog
    ) { }

  simulate() {
    // console.log('[navbar] simulate() clicked!');
    if (this.scheduleService.playNextGame()) {
      // Keep playing
    } else {
      // End of season
      this.postseason = true;
    }
  }

  openTopTeamsDialog(): void {
    const dialogRef = this.dialog.open(TopTeamsDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    }, (err) => {
      console.error('[navbar] openTopTeamsDialog() afterClosed() error: ' + err);
    });
  }

  resetSeason() {
    console.log('[navbar] resetSeason()');
    this.storageService.clearScheduleFromStorage().subscribe(() => {
      this.scheduleService.buildFullSchedule();
    }, (err) => {
      console.error('[navbar] resetSeason() clearScheduleFromStorage() error: ' + err);
    });
    this.storageService.clearTeamsFromStorage().subscribe(() => {
      this.teamService.initTeams();
    }, (err) => {
      console.error('[navbar] resetSeason() clearTeamsFromStorage() error: ' + err);
    });

    if (this.router.url.includes('schedule')) {
      this.router.navigateByUrl('/teams');
    }
  }

  getTopTeams() {
    // this.childModal.show();
    this.openTopTeamsDialog();
  }
}
