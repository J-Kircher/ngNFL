import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { StorageService } from '../service/storage.service';
import { ScheduleService } from '../service/schedule.service';
import { TeamService } from '../service/team.service';
import { TopTeamsDialogComponent } from '../dialog/top-teams/top-teams-dialog.component';
import { SimseasonDialogComponent } from '../dialog/simseason/simseason-dialog.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavBarComponent implements OnInit {
  private postseason: boolean = false;

  dialogReturn: any;
  askSimSeason: boolean = false;
  simSeason: boolean = false;
  simFast: boolean = false;
  currentGame: number = 0;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private scheduleService: ScheduleService,
    private teamService: TeamService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.scheduleService.currentGame$.subscribe(data => this.currentGame = data);
  }

  getTopTeams() {
    // this.childModal.show();
    this.openTopTeamsDialog();
  }

  simulate() {
    // console.log('[navbar] simulate() clicked!');
    if (!this.askSimSeason) {
      this.askSimSeason = true;
      if (this.currentGame === 0) {
        this.openSimSeasonDialog();
      }
    } else {
      if (this.scheduleService.playNextGame()) {
        // Keep playing
      } else {
        // End of season
        this.postseason = true;
      }
    }
  }

  playAllGames() {
    if (this.scheduleService.playNextGame()) {
      // Keep playing
      const timeout = this.simFast ? 0 : 500;
      setTimeout(() => { this.playAllGames(); }, timeout);
    } else {
      console.log('[navbar] playAllGames() End of Season');
      // End of season
      this.postseason = true;
    }
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

    this.askSimSeason = false;
    this.simSeason = false;
    this.simFast = false;
      this.postseason = false;
    this.openSnackBar('Season reset!', '');

    if (this.router.url.includes('schedule') || this.router.url.includes('teams') || this.router.url.includes('playoffs')) {
      this.router.navigateByUrl('/teams');
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

  openSimSeasonDialog(): void {
    const dialogRef = this.dialog.open(SimseasonDialogComponent, {
      data: {},
      minWidth: '30vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogReturn = result;
      if (result) {
        this.simSeason = result.simSeason;
        this.simFast = result.simFast;
        if (this.simSeason) {
          this.playAllGames();
        } else {
          this.scheduleService.playNextGame();
        }
      } else {
        this.scheduleService.playNextGame();
      }
    }, (err) => {
      console.error('[navbar] openSimSeasonDialog() afterClosed() error: ' + err);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
