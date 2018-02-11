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
var team_service_1 = require("../service/team.service");
var schedule_service_1 = require("../service/schedule.service");
var sort_1 = require("../common/sort");
var StandingsDivisionComponent = (function () {
    function StandingsDivisionComponent(router, teamService, scheduleService) {
        this.router = router;
        this.teamService = teamService;
        this.scheduleService = scheduleService;
        this.teamsArr = [];
        this.divisionTeams = [];
        this.currentGame = 0;
    }
    StandingsDivisionComponent.prototype.ngDoCheck = function () {
        // console.log('[standings-division] ngDoCheck() division: ' + this.division)
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
        // this.divisionTeams = this.getTeamsForDivision(this.division)
        this.currentGame = this.scheduleService.currentGame;
        if (this.currentGame > 0) {
            this.divisionTeams = this.teamService.getTeamsForDivision(this.division).sort(sort_1.sortDivision);
        }
        else {
            this.divisionTeams = this.teamService.getTeamsForDivision(this.division).sort(sort_1.sortDivisionByTotal);
        }
    };
    StandingsDivisionComponent.prototype.showTeam = function (abbrev) {
        this.router.navigate(['/teams/' + abbrev]);
    };
    return StandingsDivisionComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], StandingsDivisionComponent.prototype, "division", void 0);
StandingsDivisionComponent = __decorate([
    core_1.Component({
        selector: 'standings-division',
        templateUrl: 'app/standings/standings-division.component.html',
        styleUrls: ['app/standings/standings-division.component.scss']
    }),
    __metadata("design:paramtypes", [router_1.Router, team_service_1.TeamService, schedule_service_1.ScheduleService])
], StandingsDivisionComponent);
exports.StandingsDivisionComponent = StandingsDivisionComponent;
//# sourceMappingURL=standings-division.component.js.map