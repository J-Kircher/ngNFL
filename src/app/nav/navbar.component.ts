import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { TeamService } from '../service/team.service';
import { StorageService } from '../service/storage.service';
import { ScheduleService } from '../service/schedule.service';
import { PlayoffService } from '../service/playoff.service';
import { TopTeamsDialogComponent } from '../dialog/top-teams/top-teams-dialog.component';
import { SimseasonDialogComponent } from '../dialog/simseason/simseason-dialog.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavBarComponent implements OnInit {
  dialogReturn: any;
  askSimSeason: boolean = false;
  simSeason: boolean = false;
  simFast: boolean = false;
  currentGame: number = 0;
  currentGameDay: string;
  postseason: boolean = false;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private storageService: StorageService,
    private scheduleService: ScheduleService,
    private playoffService: PlayoffService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.scheduleService.currentGame$.subscribe(data => {
      this.currentGame = data;
      if (this.currentGame > 0) {
        this.askSimSeason = true;
      }
    });
    this.scheduleService.currentGameDay$.subscribe(data => this.currentGameDay = data);
    this.scheduleService.endOfSeason$.subscribe(data => this.postseason = data);
  }

  getTopTeams() {
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
      if (!this.postseason) {
        if (this.scheduleService.playNextGame(this.simSeason, this.simFast)) {
          // Keep playing
        } else {
          console.log('[navbar] simulate() Initialize playoffs');
          this.playoffService.initPlayoffs();
        }
      } else {
        console.log('[navbar] simulate() Play a playoff game!');
        this.playoffService.playPlayoffGame();
      }
    }
  }

  playAllGames() {
    if (this.scheduleService.playNextGame(this.simSeason, this.simFast)) {
      // Keep playing
      const timeout = this.simFast ? 0 : 500;
      setTimeout(() => { this.playAllGames(); }, timeout);
    } else {
      this.simSeason = false;
      console.log('[navbar] playAllGames() End of Season');
    }
  }

  resetSeason() {
    console.log('[navbar] resetSeason()');
    this.storageService.clearScheduleFromStorage().subscribe(() => {
      // Do nothing here; wait for complete
    }, (err) => {
      console.error('[navbar] resetSeason() clearScheduleFromStorage() error: ' + err);
    }, () => {
      console.log('[navbar] resetSeason() clearScheduleFromStorage() complete');
      this.scheduleService.buildFullSchedule();
      this.storageService.clearTeamsFromStorage().subscribe(() => {
        // Do nothing here; wait for complete
      }, (err) => {
        console.error('[navbar] resetSeason() clearTeamsFromStorage() error: ' + err);
      }, () => {
        console.log('[navbar] resetSeason() clearTeamsFromStorage() complete');
        this.teamService.initTeams();
        this.playoffService.resetPlayoffs();
        this.askSimSeason = false;
        this.simSeason = false;
        this.simFast = false;
        this.postseason = false;
        this.openSnackBar('Season reset!', '');

        if (this.router.url.includes('schedule') || this.router.url.includes('teams') || this.router.url.includes('playoffs')) {
          this.router.navigateByUrl('/teams');
        }
      });
    });
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
      this.askSimSeason = true;
      this.dialogReturn = result;
      if (result) {
        this.simSeason = result.simSeason;
        this.simFast = result.simFast;
        if (this.simSeason) {
          this.playAllGames();
        } else {
          this.scheduleService.playNextGame(this.simSeason, this.simFast);
        }
      } else {
        this.scheduleService.playNextGame(this.simSeason, this.simFast);
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
