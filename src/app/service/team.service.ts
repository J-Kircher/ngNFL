import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { ITeam } from '@app/model/nfl.model';
import { ConfigService } from '@app/service/config.service';
import { StorageService } from '@app/service/storage.service';

import { _TEAMS } from '@app/shared/NFLTeams2021';

@Injectable()
export class TeamService {

  private authServerUrl: string = 'http://' + this.configService.getConfig().server.host + ':' + this.configService.getConfig().server.port;
  private useServer: boolean = this.configService.getConfig().useServer;

  // private TEAMS = new Subject<ITeam[]>();
  private TEAMS: ITeam[];

  constructor (
    public http: HttpClient,
    private configService: ConfigService,
    private storageService: StorageService
  ) { }

  loadTeamsFromStorage() {
    this.TEAMS = this.storageService.loadTeamsFromLocalStorage() || [];
  }

  initTeams() {
    // console.log('[team.service] initTeams()');
    this.loadTeamsFromStorage();

    if (this.TEAMS.length < 1) {
      if (this.useServer) {
        // Use service
        const url = this.authServerUrl + '/sports/api/team';
        console.log(url);
        console.log('[team.service] initTeams() Using Service!');
        // this.TEAMS = this.http.get(this.authServerUrl).map((res: Response) => res.json());
      } else {
        // console.log('[team.service] initTeams() Not using Service!');
        this.TEAMS = _TEAMS;
        // console.log('[team.service] initTeams() TEAMS: ' + this.TEAMS.length);
      }

      this.TEAMS.forEach(team => {
        team.total = (team.qb + team.rb + team.wr + team.ol + team.dl + team.lb + team.db + team.st + team.co);
        team.wins = 0;
        team.losses = 0;
        team.pct = '.000';
        team.pf = 0;
        team.pa = 0;
        team.homewins = 0;
        team.homelosses = 0;
        team.visitwins = 0;
        team.visitlosses = 0;
        team.divwins = 0;
        team.divlosses = 0;
        team.confwins = 0;
        team.conflosses = 0;
        team.othwins = 0;
        team.othlosses = 0;
      });

      this.storageService.storeTeamsToLocalStorage(this.TEAMS);
    }
    console.log('[team.service] initTeams() Complete!');
  }

  getTeams(): Observable<ITeam[]> {
  // getTeams() {
    const subject = new Subject<ITeam[]>();

    // return this.TEAMS;

    setTimeout(() => {subject.next(this.TEAMS); subject.complete(); }, 0);
    // .next adds data to the observable stream
    // using setTimeout to simulate aschrony
    return subject;

    // return TEAMS.asObservable();
    // return TEAMS;

    // return this.http.get(url, options).map((resp: Response) => resp.json()).catch(this.handleError);

  }

  getTeam(abbrev: string): ITeam {
    return this.TEAMS.find(team => team.abbrev === abbrev);
  }

  getTeamIndex(abbrev: string): number {
    let counter = 0;
    let index = -1;
    this.TEAMS.forEach(team => {
      if (team.abbrev === abbrev) {
        index = counter;
      } else {
        counter++;
      }
    });
    return index;
  }

  getTeamByIndex(index: number): ITeam {
    return this.TEAMS[index];
  }

  getTeamsForDivision(division: string) {
    return this.TEAMS.filter(team => team.division.toLocaleLowerCase() === division.toLocaleLowerCase());
  }
}
