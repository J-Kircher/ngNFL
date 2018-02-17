import { Component, ViewChild } from '@angular/core';
import { ScheduleService } from '../service/schedule.service';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';
import { sortDivision, sortConference } from '../common/sort';
import { SimpleModalComponent } from '../common/simple-modal.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavBarComponent  {
  private postseason: boolean = false;
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  AFCDivLeaders: ITeam [] = [];
  AFCOthers: ITeam [] = [];
  AFCWildcard: ITeam[] = [];
  AFCHunt: ITeam[] = [];
  NFCDivLeaders: ITeam [] = [];
  NFCOthers: ITeam [] = [];
  NFCWildcard: ITeam[] = [];
  NFCHunt: ITeam[] = [];
  @ViewChild('childModal') childModal: SimpleModalComponent;

  constructor(private scheduleService: ScheduleService, private teamService: TeamService) { }

  simulate() {
    // console.log('[navbar] simulate() clicked!');
    if (this.scheduleService.playNextGame()) {
      // Keep playing
    } else {
      // End of season
      this.postseason = true;
    }
  }

  getTopTeams() {
    this.AFCDivLeaders = [];
    this.AFCOthers = [];
    this.AFCWildcard = [];
    this.AFCHunt = [];

    this.NFCDivLeaders = [];
    this.NFCOthers = [];
    this.NFCWildcard = [];
    this.NFCHunt = [];

    this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.teamsArr.forEach(team => {
      if (this.divisions.indexOf(team.division) < 0) {
        this.divisions.push(team.division);
      }
    });

    this.divisions
      .filter(division => division.indexOf('AFC') > -1 )
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
      .filter(division => division.indexOf('NFC') > -1 )
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

    this.childModal.show();
  }
}
