"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var schedule_service_1 = require("../service/schedule.service");
var team_service_1 = require("../service/team.service");
var TeamScheduleComponent = (function () {
    function TeamScheduleComponent(router, route, scheduleService, teamService) {
        this.router = router;
        this.route = route;
        this.scheduleService = scheduleService;
        this.teamService = teamService;
        this.teamsArr = [];
    }
    TeamScheduleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.team = _this.teamService.getTeam(params['abbrev']);
            // console.log('[team-schedule] ngOnInit() team: ' + this.team.city + ' ' + this.team.name)
            _this.teamsArr = _this.teamService.getTeams().map(function (teams) { return teams; });
            _this.teamIndex = _this.teamsArr.findIndex(function (team) { return team.abbrev === _this.team.abbrev; });
            _this.teamSchedule = _this.scheduleService.getGamesForTeam(_this.teamIndex);
            // console.table(this.teamSchedule)
            window.scrollTo(0, 0);
        });
    };
    TeamScheduleComponent.prototype.getOpponent = function (game) {
        if (game.visitTeam === this.teamIndex) {
            // console.log('[team-schedule] getOpponent() visit: ' + game.visitTeam)
            return this.teamsArr[game.homeTeam];
        }
        if (game.homeTeam === this.teamIndex) {
            // console.log('[team-schedule] getOpponent() home: ' + game.homeTeam)
            return this.teamsArr[game.visitTeam];
        }
    };
    TeamScheduleComponent.prototype.showTeam = function (abbrev) {
        // routing to the same component - TeamDetails needs to subscribe to the route paramaters
        this.router.navigate(['/teams/' + abbrev]);
    };
    return TeamScheduleComponent;
}());
TeamScheduleComponent = __decorate([
    core_1.Component({
        selector: 'team-schedule',
        template: "\n    <div class=\"container well col-sm-12\">\n      <div class=\"row well schedule\">\n        <div class=\"schedule col-sm-12\">\n          <div class=\"col-sm-12\" style=\"margin-top:5px\">\n            {{team.city}} {{team.name}} Schedule\n          </div>\n          <div class=\"well col-sm-3 gameday\" *ngFor=\"let score of teamSchedule\" (click)=\"showTeam(getOpponent(score).abbrev)\">\n            {{score.gameday}}\n            <show-score [score]=score></show-score>\n          </div>\n        </div>\n      </div>\n    </div>\n",
        styles: ["\n    .schedule {\n      font-family: Arial;\n      font-style: italic;\n      font-size: 14pt;\n      font-weight: bold;\n      vertical-align: middle;\n      margin: 0px;\n      padding: 0px;\n      border-radius: 10px;\n    }\n    .gameday {\n      font-family: Arial;\n      font-style: italic;\n      font-size: 10pt;\n      font-weight: bold;\n      cursor: pointer;\n      margin: 0px;\n      margin-bottom: 0px;\n    }\n    .gameday:hover {\n      border-color: rgba(0, 128, 0, 0.5);\n      background-color: rgba(0, 128, 0, 0.2);\n    }\n  "]
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute,
        schedule_service_1.ScheduleService, team_service_1.TeamService])
], TeamScheduleComponent);
exports.TeamScheduleComponent = TeamScheduleComponent;
//# sourceMappingURL=team-schedule.component.js.map