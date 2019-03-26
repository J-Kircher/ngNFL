import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { ITeam } from '../model/nfl.model';
import { ConfigService } from '../service/config.service';
import { StorageService } from '../service/storage.service';

const _TEAMS: ITeam[] = [
  { 'city': 'Buffalo', 'name': 'Bills', 'abbrev': 'BUF', 'lightcolor': 'CF0020', 'darkcolor': '1F488F', 'division': 'AFC East', 'qb': 5, 'rb': 7, 'wr': 5, 'ol': 6, 'dl': 7, 'lb': 6, 'db': 8, 'st': 5, 'co': 7 },
  { 'city': 'Miami', 'name': 'Dolphins', 'abbrev': 'MIA', 'lightcolor': 'EF904F', 'darkcolor': '007880', 'division': 'AFC East', 'qb': 7, 'rb': 5, 'wr': 6, 'ol': 5, 'dl': 6, 'lb': 5, 'db': 6, 'st': 6, 'co': 7 },
  { 'city': 'New England', 'name': 'Patriots', 'abbrev': 'NE', 'lightcolor': 'CF0020', 'darkcolor': '203F80', 'division': 'AFC East', 'qb': 8, 'rb': 8, 'wr': 8, 'ol': 9, 'dl': 5, 'lb': 8, 'db': 7, 'st': 8, 'co': 7 },
  { 'city': 'New York', 'name': 'Jets', 'abbrev': 'NYJ', 'lightcolor': 'D0D0D0', 'darkcolor': '007352', 'division': 'AFC East', 'qb': 5, 'rb': 5, 'wr': 5, 'ol': 7, 'dl': 7, 'lb': 6, 'db': 6, 'st': 9, 'co': 7 },
  { 'city': 'Baltimore', 'name': 'Ravens', 'abbrev': 'BAL', 'lightcolor': 'DFB800', 'darkcolor': '30186F', 'division': 'AFC North', 'qb': 6, 'rb': 9, 'wr': 6, 'ol': 8, 'dl': 9, 'lb': 8, 'db': 9, 'st': 9, 'co': 7 },
  { 'city': 'Cincinnati', 'name': 'Bengals', 'abbrev': 'CIN', 'lightcolor': 'EF904F', 'darkcolor': '000000', 'division': 'AFC North', 'qb': 7, 'rb': 6, 'wr': 6, 'ol': 7, 'dl': 7, 'lb': 8, 'db': 5, 'st': 6, 'co': 7 },
  { 'city': 'Cleveland', 'name': 'Browns', 'abbrev': 'CLE', 'lightcolor': 'EF904F', 'darkcolor': '804000', 'division': 'AFC North', 'qb': 7, 'rb': 7, 'wr': 7, 'ol': 7, 'dl': 7, 'lb': 5, 'db': 9, 'st': 5, 'co': 7 },
  { 'city': 'Pittsburgh', 'name': 'Steelers', 'abbrev': 'PIT', 'lightcolor': 'F0D700', 'darkcolor': '000000', 'division': 'AFC North', 'qb': 8, 'rb': 6, 'wr': 9, 'ol': 9, 'dl': 9, 'lb': 8, 'db': 6, 'st': 5, 'co': 7 },
  { 'city': 'Houston', 'name': 'Texans', 'abbrev': 'HOU', 'lightcolor': 'CF0020', 'darkcolor': '20386F', 'division': 'AFC South', 'qb': 8, 'rb': 7, 'wr': 7, 'ol': 5, 'dl': 8, 'lb': 6, 'db': 7, 'st': 9, 'co': 7 },
  { 'city': 'Indianapolis', 'name': 'Colts', 'abbrev': 'IND', 'lightcolor': 'D0D0D0', 'darkcolor': '20386F', 'division': 'AFC South', 'qb': 9, 'rb': 6, 'wr': 9, 'ol': 9, 'dl': 6, 'lb': 5, 'db': 8, 'st': 7, 'co': 7 },
  { 'city': 'Jacksonville', 'name': 'Jaguars', 'abbrev': 'JAX', 'lightcolor': 'BF9800', 'darkcolor': '007890', 'division': 'AFC South','qb': 5, 'rb': 5, 'wr': 5, 'ol': 6, 'dl': 8, 'lb': 5, 'db': 9, 'st': 6, 'co': 7 },
  { 'city': 'Tennessee', 'name': 'Titans', 'abbrev': 'TEN', 'lightcolor': '5FA0DF', 'darkcolor': 'CF0020', 'division': 'AFC South', 'qb': 6, 'rb': 7, 'wr': 5, 'ol': 5, 'dl': 6, 'lb': 5, 'db': 8, 'st': 7, 'co': 7 },
  { 'city': 'Denver', 'name': 'Broncos', 'abbrev': 'DEN', 'lightcolor': 'EF904F', 'darkcolor': '10285F', 'division': 'AFC West', 'qb': 6, 'rb': 8, 'wr': 6, 'ol': 8, 'dl': 8, 'lb': 9, 'db': 7, 'st': 5, 'co': 7 },
  { 'city': 'Kansas City', 'name': 'Chiefs', 'abbrev': 'KC', 'lightcolor': 'F0D700', 'darkcolor': 'CF0020', 'division': 'AFC West', 'qb': 9, 'rb': 7, 'wr': 9, 'ol': 8, 'dl': 7, 'lb': 9, 'db': 6, 'st': 9, 'co': 7 },
  { 'city': 'Los Angeles', 'name': 'Chargers', 'abbrev': 'LAC', 'lightcolor': 'F0D700', 'darkcolor': '0F284F', 'division': 'AFC West', 'qb': 8, 'rb': 7, 'wr': 8, 'ol': 8, 'dl': 7, 'lb': 5, 'db': 8, 'st': 7, 'co': 7 },
  { 'city': 'Oakland', 'name': 'Raiders', 'abbrev': 'OAK', 'lightcolor': 'D0D0D0', 'darkcolor': '000000', 'division': 'AFC West', 'qb': 6, 'rb': 5, 'wr': 6, 'ol': 6, 'dl': 5, 'lb': 7, 'db': 5, 'st': 7, 'co': 7 },
  { 'city': 'Dallas', 'name': 'Cowboys', 'abbrev': 'DAL', 'lightcolor': 'D0D0D0', 'darkcolor': '10285F', 'division': 'NFC East', 'qb': 7, 'rb': 7, 'wr': 6, 'ol': 6, 'dl': 7, 'lb': 5, 'db': 7, 'st': 7, 'co': 7 },
  { 'city': 'New York', 'name': 'Giants', 'abbrev': 'NYG', 'lightcolor': 'CF0020', 'darkcolor': '00487F', 'division': 'NFC East', 'qb': 7, 'rb': 6, 'wr': 7, 'ol': 7, 'dl': 5, 'lb': 5, 'db': 8, 'st': 8, 'co': 7 },
  { 'city': 'Philadelphia', 'name': 'Eagles', 'abbrev': 'PHI', 'lightcolor': 'D0D0D0', 'darkcolor': '005A39', 'division': 'NFC East', 'qb': 8, 'rb': 6, 'wr': 8, 'ol': 7, 'dl': 7, 'lb': 5, 'db': 7, 'st': 7, 'co': 7 },
  { 'city': 'Washington', 'name': 'Redskins', 'abbrev': 'WAS', 'lightcolor': 'F0D72F', 'darkcolor': '7F002F', 'division': 'NFC East', 'qb': 5, 'rb': 6, 'wr': 5, 'ol': 6, 'dl': 7, 'lb': 6, 'db': 7, 'st': 6, 'co': 7 },
  { 'city': 'Chicago', 'name': 'Bears', 'abbrev': 'CHI', 'lightcolor': 'EF703F', 'darkcolor': '001F3F', 'division': 'NFC North', 'qb': 7, 'rb': 7, 'wr': 7, 'ol': 8, 'dl': 8, 'lb': 6, 'db': 9, 'st': 7, 'co': 7 },
  { 'city': 'Detroit', 'name': 'Lions', 'abbrev': 'DET', 'lightcolor': 'D0D0D0', 'darkcolor': '0082BE', 'division': 'NFC North', 'qb': 7, 'rb': 6, 'wr': 6, 'ol': 8, 'dl': 8, 'lb': 7, 'db': 6, 'st': 7, 'co': 7 },
  { 'city': 'Green Bay', 'name': 'Packers', 'abbrev': 'GB', 'lightcolor': 'F0D700', 'darkcolor': '42735A', 'division': 'NFC North', 'qb': 7, 'rb': 7, 'wr': 7, 'ol': 7, 'dl': 7, 'lb': 7, 'db': 6, 'st': 8, 'co': 7 },
  { 'city': 'Minnesota', 'name': 'Vikings', 'abbrev': 'MIN', 'lightcolor': 'F0D700', 'darkcolor': '63317B', 'division': 'NFC North', 'qb': 8, 'rb': 5, 'wr': 8, 'ol': 8, 'dl': 9, 'lb': 7, 'db': 9, 'st': 7, 'co': 7 },
  { 'city': 'Atlanta', 'name': 'Falcons', 'abbrev': 'ATL', 'lightcolor': 'CF0020', 'darkcolor': '000000', 'division': 'NFC South', 'qb': 9, 'rb': 6, 'wr': 9, 'ol': 7, 'dl': 6, 'lb': 5, 'db': 6, 'st': 7, 'co': 7 },
  { 'city': 'Carolina', 'name': 'Panthers', 'abbrev': 'CAR', 'lightcolor': 'D0D0D0', 'darkcolor': '009FD0', 'division': 'NFC South', 'qb': 7, 'rb': 8, 'wr': 7, 'ol': 8, 'dl': 7, 'lb': 9, 'db': 6, 'st': 5, 'co': 7 },
  { 'city': 'New Orleans', 'name': 'Saints', 'abbrev': 'NO', 'lightcolor': 'D0C78F', 'darkcolor': '000000', 'division': 'NFC South', 'qb': 9, 'rb': 9, 'wr': 8, 'ol': 9, 'dl': 9, 'lb': 5, 'db': 6, 'st': 9, 'co': 7 },
  { 'city': 'Tampa Bay', 'name': 'Buccaneers', 'abbrev': 'TB', 'lightcolor': '90887F', 'darkcolor': 'BF083F', 'division': 'NFC South', 'qb': 8, 'rb': 5, 'wr': 9, 'ol': 7, 'dl': 8, 'lb': 8, 'db': 5, 'st': 6, 'co': 7 },
  { 'city': 'Arizona', 'name': 'Cardinals', 'abbrev': 'ARI', 'lightcolor': 'F0D700', 'darkcolor': 'A0003F', 'division': 'NFC West', 'qb': 5, 'rb': 5, 'wr': 5, 'ol': 6, 'dl': 9, 'lb': 9, 'db': 8, 'st': 5, 'co': 7 },
  { 'city': 'Los Angeles', 'name': 'Rams', 'abbrev': 'LAR', 'lightcolor': 'F0D700', 'darkcolor': '10407F', 'division': 'NFC West', 'qb': 8, 'rb': 9, 'wr': 8, 'ol': 9, 'dl': 7, 'lb': 7, 'db': 6, 'st': 9, 'co': 7 },
  { 'city': 'San Francisco', 'name': '49ers', 'abbrev': 'SF', 'lightcolor': 'C0A87F', 'darkcolor': 'A0003F', 'division': 'NFC West', 'qb': 7, 'rb': 6, 'wr': 7, 'ol': 5, 'dl': 7, 'lb': 5, 'db': 5, 'st': 8, 'co': 7 },
  { 'city': 'Seattle', 'name': 'Seahawks', 'abbrev': 'SEA', 'lightcolor': '838EB2', 'darkcolor': '3B527B', 'division': 'NFC West', 'qb': 9, 'rb': 9, 'wr': 7, 'ol': 7, 'dl': 7, 'lb': 9, 'db': 7, 'st': 7, 'co': 7 }
];

@Injectable()
export class TeamService {

  private authServerUrl: string = 'http://' + this.configService.getConfig().server.host + ':' + this.configService.getConfig().server.port;
  private useServer: boolean = this.configService.getConfig().useServer;

  // private TEAMS = new Subject<ITeam[]>();
  private TEAMS: ITeam[];

  constructor (
    public http: Http,
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

  getAllCurrentTeams(): Observable<ITeam[]> {
    const subject = new Subject<ITeam[]>();
    setTimeout(() => {subject.next(this.TEAMS); subject.complete(); }, 0);
    // .next adds data to the observable stream
    // using setTimeout to simulate aschrony
    return subject;
  }

  getTeams(): Observable<ITeam[]> {
  // getTeams() {
    const subject = new Subject<ITeam[]>();

    // return this.TEAMS;

    setTimeout(() => {subject.next(_TEAMS); subject.complete(); }, 0);
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
