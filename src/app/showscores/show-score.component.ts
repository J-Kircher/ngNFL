import { Component, Input, OnInit } from '@angular/core';
import { TeamService } from '@app/service/team.service';
import { ITeam, ISchedule } from '@app/model/nfl.model';
import { calculateOdds } from '@app/common/odds';

@Component({
  selector: 'show-score',
  templateUrl: './show-score.component.html',
  styleUrls: ['./show-score.component.scss']
})

export class ShowScoreComponent implements OnInit {
  @Input() score: ISchedule;
  teamsArr: ITeam[] = [];
  loading: boolean = true;
  odds: number = 0;

  constructor(
    private teamService: TeamService
  ) { }

  ngOnInit() {
    // console.log('[show-score] ngOnInit()');
    // console.table(this.score);

    this.teamService.getTeams().subscribe((data: ITeam[]) => {
      this.teamsArr = data;
      // console.log('[show-score] ngOnInit() getTeams() SUCCESS');
      this.loading = false;
      // this.odds = calculateOdds(this.teamsArr[this.score.visitTeam], this.teamsArr[this.score.homeTeam]);
    }, (err) => {
      console.error('[show-score] ngOnInit() getTeams() error: ' + err);
    });
  }

  showQuarter() {
    return !['F', 'OT'].includes(this.score.quarter);
  }
}
