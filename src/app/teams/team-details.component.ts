import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamService } from '../service/team.service';
import { PlayoffService } from '../service/playoff.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'team-details', // This html tag is not necessary since we will be navigating to this
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})

export class TeamDetailsComponent implements OnInit {
  team: ITeam;
  teamIdx: number;
  total: number;
  SuperBowlChamp: number;

  constructor(
    private teamService: TeamService,
    private playoffService: PlayoffService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.teamIdx = this.teamService.getTeamIndex(params['abbrev']);
      this.team = this.teamService.getTeam(params['abbrev']);
      this.total = this.team.qb + this.team.rb + this.team.wr + this.team.ol +
        this.team.dl + this.team.lb + this.team.db + this.team.st + this.team.co;
    });
    this.playoffService.SuperBowlChamp$.subscribe(data => this.SuperBowlChamp = data);
  }
}
