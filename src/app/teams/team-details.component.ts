import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamService } from '../service/team.service';
import { ITeam } from '../model/nfl.model';

@Component({
  selector: 'team-details', // This html tag is not necessary since we will be navigating to this
  templateUrl: './team-details.component.html',
  styles: [`
    .banner-border {
      margin-top: 0px;
      margin-bottom: 0px;
    }
    .banner-center {
      font-style: Arial;
      font-size: 18pt;
      font-weight: bold;
      text-align: center;
      color: white;
      margin-top: 0px;
      margin-bottom: 0px;
      padding-top: 0px;
      padding-bottom: 0px;
    }
    td {
      font-style: Arial;
      font-size: 12pt;
      font-weight: bold;
      text-align: center;
    }
  `]
})

export class TeamDetailsComponent implements OnInit {
  team: ITeam;
  total: number;

  constructor(private teamService: TeamService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.team = this.teamService.getTeam(params['abbrev']);
      this.total = this.team.qb + this.team.rb + this.team.wr + this.team.ol +
        this.team.dl + this.team.lb + this.team.db + this.team.st + this.team.co;
    });
  }
}
