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
var schedule_service_1 = require("../service/schedule.service");
var team_service_1 = require("../service/team.service");
var sort_1 = require("../common/sort");
var NavBarComponent = (function () {
    function NavBarComponent(scheduleService, teamService) {
        this.scheduleService = scheduleService;
        this.teamService = teamService;
        this.postseason = false;
        this.divisions = [];
        this.teamsArr = [];
        this.AFCDivLeaders = [];
        this.AFCOthers = [];
        this.AFCWildcard = [];
        this.AFCHunt = [];
        this.NFCDivLeaders = [];
        this.NFCOthers = [];
        this.NFCWildcard = [];
        this.NFCHunt = [];
    }
    NavBarComponent.prototype.simulate = function () {
        // console.log('[navbar] simulate() clicked!')
        if (this.scheduleService.playNextGame()) {
        }
        else {
            // End of season
            this.postseason = true;
        }
    };
    NavBarComponent.prototype.getTopTeams = function () {
        var _this = this;
        this.AFCDivLeaders = [];
        this.AFCOthers = [];
        this.AFCWildcard = [];
        this.AFCHunt = [];
        this.NFCDivLeaders = [];
        this.NFCOthers = [];
        this.NFCWildcard = [];
        this.NFCHunt = [];
        this.teamsArr = this.teamService.getTeams().map(function (teams) { return teams; });
        this.teamsArr.forEach(function (team) {
            if (_this.divisions.indexOf(team.division) < 0) {
                _this.divisions.push(team.division);
            }
        });
        this.divisions
            .filter(function (division) { return division.indexOf('AFC') > -1; })
            .forEach(function (division) {
            var thisDiv = _this.teamsArr.filter(function (team) { return (team.division === division); });
            thisDiv.sort(sort_1.sortDivision);
            _this.AFCDivLeaders.push(thisDiv[0]);
            _this.AFCOthers.push(thisDiv[1]);
            _this.AFCOthers.push(thisDiv[2]);
            _this.AFCOthers.push(thisDiv[3]);
        });
        this.AFCDivLeaders.sort(sort_1.sortConference);
        this.AFCOthers.sort(sort_1.sortConference);
        this.AFCWildcard.push(this.AFCOthers[0]);
        this.AFCWildcard.push(this.AFCOthers[1]);
        this.AFCHunt.push(this.AFCOthers[2]);
        this.AFCHunt.push(this.AFCOthers[3]);
        this.AFCHunt.push(this.AFCOthers[4]);
        this.AFCHunt.push(this.AFCOthers[5]);
        this.divisions
            .filter(function (division) { return division.indexOf('NFC') > -1; })
            .forEach(function (division) {
            var thisDiv = _this.teamsArr.filter(function (team) { return (team.division === division); });
            thisDiv.sort(sort_1.sortDivision);
            _this.NFCDivLeaders.push(thisDiv[0]);
            _this.NFCOthers.push(thisDiv[1]);
            _this.NFCOthers.push(thisDiv[2]);
            _this.NFCOthers.push(thisDiv[3]);
        });
        this.NFCDivLeaders.sort(sort_1.sortConference);
        this.NFCOthers.sort(sort_1.sortConference);
        this.NFCWildcard.push(this.NFCOthers[0]);
        this.NFCWildcard.push(this.NFCOthers[1]);
        this.NFCHunt.push(this.NFCOthers[2]);
        this.NFCHunt.push(this.NFCOthers[3]);
        this.NFCHunt.push(this.NFCOthers[4]);
        this.NFCHunt.push(this.NFCOthers[5]);
    };
    return NavBarComponent;
}());
NavBarComponent = __decorate([
    core_1.Component({
        selector: 'nav-bar',
        templateUrl: 'app/nav/navbar.component.html',
        styleUrls: ['app/nav/navbar.component.scss']
    }),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService, team_service_1.TeamService])
], NavBarComponent);
exports.NavBarComponent = NavBarComponent;
//# sourceMappingURL=navbar.component.js.map