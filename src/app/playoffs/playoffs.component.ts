import { Component, OnInit } from '@angular/core';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';
import { PlayoffService } from '../service/playoff.service';

@Component({
  selector: 'playoffs',
  templateUrl: './playoffs.component.html',
  styleUrls: ['./playoffs.component.scss']
})

export class PlayoffsComponent implements OnInit {
  divisions: string[] = [];
  teamsArr: ITeam[] = [];
  AFCPlayoffTeams: number[] = [];
  NFCPlayoffTeams: number[] = [];
  SuperBowlChamp: number;
  loading: boolean = true;

  constructor(private teamService: TeamService, private playoffService: PlayoffService) { }

  ngOnInit() {
    // console.log('[playoffs] ngOnInit()');

    // this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[playoffs] ngOnInit() getTeams() SUCCESS');

      this.playoffService.getAFCPlayoffTeams().subscribe(aData => {
        this.AFCPlayoffTeams = aData; // .map(teams => teams);
      }, (err) => {
        console.error('[playoffs] ngOnInit() getAFCPlayoffTeams() error: ' + err);
      });
      this.playoffService.getNFCPlayoffTeams().subscribe(nData => {
        this.NFCPlayoffTeams = nData.map(teams => teams);
      }, (err) => {
        console.error('[playoffs] ngOnInit() getNFCPlayoffTeams() error: ' + err);
      });
      // this.SuperBowlChamp = this.playoffService.SuperBowlChamp;

      this.loading = false;
      window.scrollTo(0, 0);
    }, (err) => {
      console.error('[playoffs] ngOnInit() getTeams() error: ' + err);
    });
  }
}
