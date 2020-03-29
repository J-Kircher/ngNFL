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
  showQuarter: boolean = false;
  timerSet: boolean = false;
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

  checkQuarter() {
    if (this.score.quarter === '4') {
      // Game is almost over, start the timer
      if (!this.timerSet) {
        this.timerSet = true;
        setTimeout(() => {
          this.showQuarter = false;
        }, 4005);
      }
    } else if (this.score.quarter === '1') {
      // Game is starting, show the quarter
      this.showQuarter = true;
    }
    // If the game was already over, then show nothing
    return this.showQuarter || !['F', 'OT'].includes(this.score.quarter);
  }
}
