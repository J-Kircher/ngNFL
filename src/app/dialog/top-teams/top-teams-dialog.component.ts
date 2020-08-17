import { Component, OnInit, DoCheck, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';

import { TeamService } from '@app/service/team.service';
import { ITeam } from '@app/model/nfl.model';
import { sortDivision, sortConference } from '@app/common/sort';

@Component({
  selector: 'app-top-teams-dialog',
  templateUrl: './top-teams-dialog.component.html',
  styleUrls: ['./top-teams-dialog.component.scss']
})
export class TopTeamsDialogComponent implements OnInit, DoCheck, OnDestroy {

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<TopTeamsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  tabIndex: number;
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  AFCDivLeaders: ITeam[] = [];
  AFCOthers: ITeam[] = [];
  AFCWildcard: ITeam[] = [];
  AFCHunt: ITeam[] = [];
  NFCDivLeaders: ITeam[] = [];
  NFCOthers: ITeam[] = [];
  NFCWildcard: ITeam[] = [];
  NFCHunt: ITeam[] = [];

  ngOnInit() {
    // this.teamsArr = this.teamService.getCurrentTeams().map(teams => teams);

    if (this.data) {
      this.tabIndex = this.data.tabIndex;
    } else {
      this.tabIndex = 0;
    }

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[navbar] ngOnInit() getCurrentTeams() SUCCESS');
    }, (err) => {
      console.error('[top-teams] ngOnInit() getTeams() error: ' + err);
    });
  }

  ngDoCheck() {
    if (this.teamsArr.length > 0) {
      this.AFCDivLeaders = [];
      this.AFCOthers = [];
      this.AFCWildcard = [];
      this.AFCHunt = [];

      this.NFCDivLeaders = [];
      this.NFCOthers = [];
      this.NFCWildcard = [];
      this.NFCHunt = [];

      this.teamsArr.forEach(team => {
        if (this.divisions.indexOf(team.division) < 0) {
          this.divisions.push(team.division);
        }
      });

      this.divisions
        .filter(division => division.indexOf('AFC') > -1)
        .forEach(division => {
          const thisDiv: ITeam[] = this.teamsArr.filter(team => (team.division === division));
          thisDiv.sort(sortDivision);
          this.AFCDivLeaders.push(thisDiv[0]);
          this.AFCOthers.push(thisDiv[1]);
          this.AFCOthers.push(thisDiv[2]);
          this.AFCOthers.push(thisDiv[3]);
        });

      this.AFCDivLeaders.sort(sortConference);
      this.AFCOthers.sort(sortConference);

      this.AFCWildcard.push(this.AFCOthers[0]);
      this.AFCWildcard.push(this.AFCOthers[1]);

      this.AFCHunt.push(this.AFCOthers[2]);
      this.AFCHunt.push(this.AFCOthers[3]);
      this.AFCHunt.push(this.AFCOthers[4]);
      this.AFCHunt.push(this.AFCOthers[5]);

      this.divisions
        .filter(division => division.indexOf('NFC') > -1)
        .forEach(division => {
          const thisDiv: ITeam[] = this.teamsArr.filter(team => (team.division === division));
          thisDiv.sort(sortDivision);
          this.NFCDivLeaders.push(thisDiv[0]);
          this.NFCOthers.push(thisDiv[1]);
          this.NFCOthers.push(thisDiv[2]);
          this.NFCOthers.push(thisDiv[3]);
        });

      this.NFCDivLeaders.sort(sortConference);
      this.NFCOthers.sort(sortConference);

      this.NFCWildcard.push(this.NFCOthers[0]);
      this.NFCWildcard.push(this.NFCOthers[1]);

      this.NFCHunt.push(this.NFCOthers[2]);
      this.NFCHunt.push(this.NFCOthers[3]);
      this.NFCHunt.push(this.NFCOthers[4]);
      this.NFCHunt.push(this.NFCOthers[5]);
    }
  }

  ngOnDestroy() {
    this.onClose();
  }

  tabClicked(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }

  onClose(): void {
    this.dialogRef.close({ 'tabIndex': this.tabIndex });
  }
}
