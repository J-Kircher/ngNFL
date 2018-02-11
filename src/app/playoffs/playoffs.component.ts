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

  constructor(private teamService: TeamService, private playoffService: PlayoffService) { }

  ngOnInit() {
    // console.log('[playoffs] ngOnInit()');

    this.teamsArr = this.teamService.getTeams().map(teams => teams);

    this.AFCPlayoffTeams = this.playoffService.getAFCPlayoffTeams().map(teams => teams);
    this.NFCPlayoffTeams = this.playoffService.getNFCPlayoffTeams().map(teams => teams);
    // this.SuperBowlChamp = this.playoffService.SuperBowlChamp;

    window.scrollTo(0, 0);
  }
}
