import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { TeamService } from '../service/team.service';
import { StorageService } from '../service/storage.service';
import { ScheduleService } from '../service/schedule.service';
import { PlayoffService } from '../service/playoff.service';
import { GameService } from '../service/game.service';
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
  topTeamsTabIndex: number = 0;
  currentGame: number = 0;
  currentGameDay: string;
  finalGame: number;
  progress: number = 0;
  postseason: boolean = false;
  playoffTeams: number[] = [];
  calledInitPlayoffs: boolean = false;
  oneGameAtATime: boolean = true;
  gameActive: boolean = false;
  seasonOver: boolean = false;

  constructor(
    private router: Router,
    private teamService: TeamService,
    private storageService: StorageService,
    private scheduleService: ScheduleService,
    private playoffService: PlayoffService,
    private gameService: GameService,
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
    this.gameService.gameActive$.subscribe(data => this.gameActive = data);
    this.scheduleService.finalGame$.subscribe(data => this.finalGame = data);
    this.progress = Math.round((this.currentGame / this.finalGame) * 1000) / 10;
  }

  initPlayoffs() {
    // console.log('[navbar] initPlayoffs()');
    if (this.postseason && !this.calledInitPlayoffs) {
      this.calledInitPlayoffs = true;
      if (this.playoffTeams.length === 0) {
        this.playoffService.getPlayoffTeams().subscribe((tData: number[]) => {
          this.playoffTeams = tData;
        }, (err) => {
          console.error('[navbar] initPlayoffs() getPlayoffTeams() error: ' + err);
        }, () => {
          // console.log('[navbar] initPlayoffs() getPlayoffTeams() COMPLETE');
          // console.log('[navbar] initPlayoffs() calling initPlayoffs()');
          this.playoffService.initPlayoffs();
          this.simFast = false;
          this.seasonOver = false;
        });
      }
    }
    if (!this.calledInitPlayoffs) {
      setTimeout(() => { this.initPlayoffs(); }, 1005);
    }
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
        if (this.scheduleService.playNextGame(this.simFast)) {
          this.progress = Math.round((this.currentGame / this.finalGame) * 1000) / 10;
          // Keep playing
          if (this.progress === 100) {
            console.log('[navbar] simulate() progress at 100, calling initPlayoffs()');
            this.initPlayoffs();
          }
        } else {
          console.log('[navbar] simulate() season over, calling initPlayoffs()');
          this.initPlayoffs();
        }
      } else {
        // console.log('[navbar] simulate() Play a playoff game!');
        if (this.playoffService.playPlayoffGame(this.simFast)) {
          // Keep playing
        } else {
          this.seasonOver = true;
        }
      }
    }
  }

  simActive() {
    return this.simSeason || (this.gameActive && !this.simSeason && this.oneGameAtATime);
  }

  playAllGames() {
    if (this.scheduleService.playNextGame(this.simFast)) {
      this.progress = Math.round((this.currentGame / this.finalGame) * 1000) / 10;
      // Keep playing
      const timeout = this.simFast ? 50 : 500;
      setTimeout(() => { this.playAllGames(); }, timeout);
    } else {
      this.simSeason = false;
      console.log('[navbar] playAllGames() sim season complete, calling initPlayoffs()');
      this.initPlayoffs();
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
        this.progress = 0;
        this.postseason = false;
        this.playoffTeams = [];
        this.calledInitPlayoffs = false;
        this.seasonOver = false;
        this.openSnackBar('Season reset!', '');

        if (this.router.url.includes('schedule') || this.router.url.includes('teams') || this.router.url.includes('playoffs')) {
          this.router.navigateByUrl('/teams');
        }
      });
    });
  }

  openTopTeamsDialog(): void {
    const dialogRef = this.dialog.open(TopTeamsDialogComponent, {
      data: { 'tabIndex': this.topTeamsTabIndex }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
      if (result) {
        this.topTeamsTabIndex = result.tabIndex;
      }
    }, (err) => {
      console.error('[navbar] openTopTeamsDialog() afterClosed() error: ' + err);
    });
  }

  openSimSeasonDialog(): void {
    const dialogRef = this.dialog.open(SimseasonDialogComponent, {
      data: { simFast: this.simFast },
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
          this.scheduleService.playNextGame(this.simFast);
        }
      } else {
        this.scheduleService.playNextGame(this.simFast);
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
