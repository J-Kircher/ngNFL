import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TeamService } from '@app/service/team.service';
import { PlayoffService } from '@app/service/playoff.service';
import { ITeam } from '@app/model/nfl.model';

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
  attColumns: string[] = [];
  statsColumns: string[] = [];
  dataSource = new MatTableDataSource();

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
    this.attColumns = ['qb', 'rb', 'wr', 'ol', 'dl', 'lb', 'db', 'st', 'co', 'total'];
    this.statsColumns = ['wins', 'losses', 'pf', 'pa'];
    this.dataSource = new MatTableDataSource([this.team]);
    window.scrollTo(0, 0);
  }
}
